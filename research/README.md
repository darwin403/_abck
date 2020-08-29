# Reference

https://github.com/godtoy/akamai-web-sensor-mock

# Sensor Data

```javascript
7a74G7m23Vrp0o5c918570

1.6 (version)

-1,2,-94,-100,(user-agent)
Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36,(my-user-agent)

uaend,12147,20030107,en,Gecko,3,0,0,0,392720,6204988[ss-changes],1366,696,1366,768,1366,592[ss-changes],1366,,cpen:0,i1:0,dm:0,cwen:0,non:1,opc:0,fc:0,sc:0,wrc:1,isc:0,vib:1,bat:1,x11:0,x12:1,7603,0.246400669123[ss-changes],798058102493.5[ss-changes],loc:-1,2,-94,-101,do_en,dm_en,t_en

-1,2,-94,-105,0,0,0,0,2043,630,0;
-1,2,-94,-102,0,0,0,0,2043,630,0;(informinfo)

-1,2,-94,-108,(keyboard-action -> kact)
-1,2,-94,-110,(mouse-action -> mact)
-1,2,-94,-117,(touch-action)
-1,2,-94,-111,0,1403,-1,-1,-1;(device_orientation)
-1,2,-94,-109,0,1401,-1,-1,-1,-1,-1,-1,-1,-1,-1;(device_motion)
-1,2,-94,-114,(pointer-action)
-1,2,-94,-103,(display-change)
-1,2,-94,-112,https://www.nike.com/in(current_url)
-1,2,-94,-115,1,32,32,1403,1401,0,2804,6392,0,1596116204987,22,17074,0,0,2845,0,0,6394,2804,0,885B2792F2BEB3BC38FF7FF1A8957C57~-1~YAAQVjZ8aGF3Co9zAQAA44PwnwRpPqIz3japOycoFHKcrJpyT602KmCvnKjTVH5w/PMrR6zWa8YSVOiicMWx3Df9iT/LI81QXre89nW3SS2RdJhfq+GKy2XVnzK4plXQyVo+QH/SYqdOXJ2s8lNrewQsmgDrIqFdtOqN70W0lf27UcpnQS+pfkpe5LtbkRlXOpXYUMlHUkLbcT34r0mHgcs4yi15GCjbVh9J2eJNuDNrQjMp/5zRi6ixy3fAdJHFpmi87zOzzpbte486gk63xgB6kUxIp9LK4B4sZRibj8+iWlcFfje2FKo9VqK7lHUe+3MvuJzutlOZ4OjZjnNYXUH7eAaOrt97N2dn460zHXY=~-1~||1-shhdYqlCmS-1500-10-1000-2||~-1,36358,259,-1507769006,30261689,PiZtE,91634,22(cookie)
-1,2,-94,-106,8,2(aj_XX)
-1,2,-94,-119,100,100,197,167,106,84,96,72,75,67,70,24,36,542,(performance -> bmak.mr)
-1,2,-94,-122,0,0,0,0,1,0,0(env_config)
-1,2,-94,-123,
-1,2,-94,-124,0.6aa2182759454,0.80b1d15a91de9,0.a93d05d911e97,0.d2dc767efb214,0.403db49f5af8b,0.cc5643da9e7a1,0.bd97b2e6c372b,0.15608399d56f7,0.a81eef14ca675,0.28a66f363c3a4;432,175,240,31,372,3,125,3,240,272;3906,1235,4130,432,7038,65,2392,22,4445,5298;885B2792F2BEB3BC38FF7FF1A8957C57,1596116204987,shhdYqlCmS,885B2792F2BEB3BC38FF7FF1A8957C571596116204987shhdYqlCmS,1500,1500,0.6aa2182759454,885B2792F2BEB3BC38FF7FF1A8957C571596116204987shhdYqlCmS15000.6aa2182759454,20,150,30,29,175,206,238,244,14,81,74,167,58,230,13,109,92,9,6,150,153,52,183,71,171,247,241,147,128,82,36,84;

-1,2,-94,-126, (NEW)
-1,2,-94,-127,11321144241322243122 (NEW-> nav_perm)
-1,2,-94,-70,-705080415;1993109966;dis;,7,8;true;true;true;-330;true;24;24;true;false;-1 (fpcf / fpValstr)
-1,2,-94,-80,5582 (fpcf -> Encoded)
-1,2,-94,-116,7539060570 (TIME??)
-1,2,-94,-118,122612 (sensor_data (up til nav_perm) -> Encoded)
-1,2,-94,-121,
;6(milliseconds diff - sensor_data generation)
;30(milliseconds diff - first_sensor_data generation)
;0(milliseconds diff - this sensor_data generation)
```

# Functions

- `bmk.uar()` - Get user agent.
- `a.sf4()` - Check if mobile/iPad device or Old device.
- `htm` - Handle Touch Move
- `cta` - Controller Touch Action
- `gf` - GetFocussed: Returns a number obtained by adding the charCodes.
- `fidcount` - Count accumulator in focussed id
- `prevfid` - Previous focus element id.
- `kact` - KeyboardActionController
- `mme_cnt` - MouseMoveEvent_Count
- `mme_cnt_lmt` - MouseMoveEvent_Count_Limit
- `mduce_cnt` - MouseDownUpClickEvent_Count
- `mduce_cnt_limit` - MouseDownUpClickEvent_Count_Limit
- `me_vel` MouseEvent_Velocity???
- `ke_vel` KeyboardEvent_Velocity???
- `it0` - isNotTrustedClick
- `gd` - GetDevice
- `bpd` - BeforePostData
- `pd` - PostData
- `js_post` - General True/False to Post data to server.
- `apicall_bm` - apiPost sensor_data without session_id.
- `apicall` - apiPost sensor_data with session_id.
- `aj_indx` - AjaxCount
- `aj_type` - AjaxType - Type of event (click/keyboard/etc..) which triggered ajax.
- `ce_js_post` - ClickEvent_JS_Post - Set to 1 if ajax request sent after request.
- `doact` - DeviceOrientationAction
- `startdoadma` - StartDeviceOrientationActionDeviceMotionAction
- `cdoa` - ControllerDeviceOrientationAction
- `cdma` - ControllerDeviceMotionAction
- `doa_throttle` - DeviceOrientationAction_Throttle
- `vc` - VisibilityChange - The type of visibilitychange event listener available on current browser.
- `rve` - RVisibilityEvent
- `hb` - HandleBlurWindow
- `hvc` - HandleVisibilityChange
- `hf` - HandleFocusWindow
- `unk` - Unknown
- `fpValstr` -FingerPrintValueString
- `fpValCalculated` - FingerPrintValueCalculated
- `ta` - TotalTimeAction
- `mn_r` - ???
- `nav_perm` - Navigator_Permissions
- `o9` - ???
- `ab` - EncodeString1
- `sd_debug` - SensorData_Debug
- `od` - EncoderString2
- `bm-telemetry` - BehaviorMonitor_Telemetry
- `pen` -PhantomEnabled
- `wen` - WebdriverEnabled
- `den` - DomAutomationEnabled
- `x2` - Date.now()
- `cpen`- CallPhantomEnabled
- `getmr` - GetMathRandom