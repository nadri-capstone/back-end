package com.example.nadri4_edit1;

import android.annotation.SuppressLint;
import android.content.Context;
import android.location.Address;
import android.location.Geocoder;
import android.net.Uri;
import android.provider.Settings;
import android.util.Log;

import androidx.exifinterface.media.ExifInterface;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.JsonRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ReqServer {
    public static String sDate;
    Context c;

    public ReqServer(Context context) {
        c = context;
    }

    //페이지 정보 요청하기
    public static void reqGetPages(Context context, ArrayList<Uri> uriList){
        //android_id 가져와서 ip 주소랑 합치기
        String android_id = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ANDROID_ID);
        String url = context.getString(R.string.testIpAddress) + android_id + "/" + sDate;
        Log.d("HWA", "GET Url: " + url);

        //요청 만들기
        final JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                Log.d("HWA", "GET Response" + response);
                for(int i = 0; i< response.length(); i++){
                    try {
                        Log.d("HWA", "GET Response Uri: " + String.valueOf(response.getJSONObject(i).get("id")));
                        uriList.add(Uri.parse(String.valueOf(response.getJSONObject(i).get("id"))));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                AlbumLayout.adapter = new MultiImageAdapter(uriList, AlbumLayout.recyclerView.getContext());

                //레이아웃 설정(열 = 2)
                RecyclerView.LayoutManager manager = new GridLayoutManager(AlbumLayout.recyclerView.getContext(), 2);
                //recyclerView.LayoutManager(new GridLayoutManager(this, 2));

                //레이아웃 적용
                AlbumLayout.recyclerView.setLayoutManager(manager);

                //어댑터 적용
                AlbumLayout.recyclerView.setAdapter(AlbumLayout.adapter);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("HWA", "GET Response 에러: " + error);
            }
        });


        //큐에 넣어 서버로 응답 전송
        RequestQueue requestQueue = Volley.newRequestQueue(context);
        requestQueue.add(jsonArrayRequest);
    }

    //작성한 페이지 보내기
    @SuppressLint("RestrictedApi")
    public static void reqPostPages(Context context, ArrayList<Uri> uriList, ArrayList<Integer> appendList){
        String android_id = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ANDROID_ID);
        String url = context.getString(R.string.testIpAddress) + android_id;
        Log.d("HWA", "POST Url: " + url);

        //서버로 보낼 Json
        JSONArray reqJsonArr = new JSONArray();
        JSONObject reqJson = new JSONObject();

        try{
            for(int i : appendList){
                Log.d("HWA", "appendList i: " + i);
                //사진 정보 가져오기
                InputStream inputStream = context.getContentResolver().openInputStream(uriList.get(i));
                ExifInterface exif = new ExifInterface(inputStream);

                JSONObject photoJson = new JSONObject();
                photoJson.put("id", uriList.get(i));

                //날짜시간 정보 가져오기
                Long dateTime = exif.getDateTime();
                photoJson.put("datetime", dateTime);

                //위치 정보 가져오기
                double latLong[] = exif.getLatLong();
                Log.d("HWA", "latLong: " + Arrays.toString(latLong) + " / " + exif.getAttribute(ExifInterface.TAG_GPS_LATITUDE) + ", " + exif.getAttribute(ExifInterface.TAG_GPS_LONGITUDE));
                //경도, 위도, 주소를 담을 Json
                JSONObject location = new JSONObject();
                if(latLong != null){
                    Geocoder gCoder = new Geocoder(context);
                    List<Address> addressList = gCoder.getFromLocation(latLong[0], latLong[1], 10);
                    Log.d("HWA", "addressList " + i + ": " + addressList);

                    location.put("lat", latLong[0]);
                    location.put("long", latLong[1]);
                    if(!addressList.isEmpty())
                        location.put("address", addressList.get(0).getAddressLine(0));

                    photoJson.put("location", location);
                }

                JSONObject pages = new JSONObject();
                pages.put("page", sDate);
                pages.put("layoutOrder", i);

                photoJson.put("pages", pages);

                Log.d("HWA", "photoJson" + i + ": " + photoJson);

                reqJsonArr.put(photoJson);
                /*
                String timeData = exif.getAttribute(ExifInterface.TAG_DATETIME);
                String lat = exif.getAttribute(ExifInterface.TAG_GPS_LATITUDE);
                String lng = exif.getAttribute(ExifInterface.TAG_GPS_LONGITUDE);
                Log.d("HWA", "timeData: "+ timeData + " lat:" + lat + " lng: " + lng);
                */
            }
            reqJson.put("photos", reqJsonArr);
            Log.d("HWA", "reqJson: " + reqJson);
        } catch (Exception e) {
            Log.d("HWA", "POST 에러: " + e);
        }


        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url, reqJson, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Log.d("HWA", "POST 응답: " + response);
                appendList.clear();
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("HWA", "POST Response 에러: " + error);
            }
        });

        RequestQueue requestQueue = Volley.newRequestQueue(context);
        requestQueue.add(jsonObjectRequest);
    }
}
