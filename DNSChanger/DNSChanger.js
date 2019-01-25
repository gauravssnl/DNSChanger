/*
Author : gauravssnl
I am just a student who failed.
*/
curr= -1;

var WIDTH = app.GetScreenWidth();
var HEIGHT = app.GetScreenHeight();

function OnStart()
{
	for (;;) {
		var lay = app.CreateLayout("Linear");
		lay.SetVisibility('Hide');
		app.AddLayout(lay);
		var b = app.CreateButton();
		lay.AddChild(b);
		var t = app.CreateText();
		lay.AddChild(t);
		app.Wait(0.05);
		var h = +b.GetHeight();
		var ht = +t.GetHeight();
		app.DestroyLayout(lay);
		if (h) break;
	}
	BTN_HEIGHT = h;
	TXT_HEIGHT = ht;
	
	 curr = 1;
	app.SetOrientation( "portrait" );
app.EnableBackKey( false);
	layMain = app.CreateLayout( "Linear", "Vertical" );
	layMain.SetBackGradient( "#eeeeee", "#ffffff");
	layT = app.CreateLayout( "Linear", "Horizontal,FillX,vcenter" );
	layT.SetBackColor( "#ff0000" );
	layMain.AddChild( layT );
	var wBtn = BTN_HEIGHT*HEIGHT/WIDTH;
	sideBtn = app.CreateButton( "[fa-list]", -1, -1,"fontawesome,Custom" );
	sideBtn.SetSize(wBtn, BTN_HEIGHT);
	sideBtn.SetTextSize(BTN_HEIGHT*HEIGHT/2, 'px');
	sideBtn.SetBackColor( "#ff0000" );
	sideBtn.SetOnTouch( sideBtn_OnTouch );
	layT.AddChild( sideBtn );
	title = app.CreateText( "DNSChanger", 1-wBtn,  -1, "fontawesome" );
	title.SetTextSize( 25 );
	layT.AddChild( title );
	
	var layBody = app.CreateLayout('linear');
	layBody.SetSize(1, 1-BTN_HEIGHT*2-TXT_HEIGHT);
	layMain.AddChild(layBody);
	
	txt1 = app.CreateText( "Domain Name Server :", 1,-1,"Left");
	txt1.SetTextSize( 20 );
	txt1.SetTextColor( "Red" );
	layBody.AddChild( txt1 );
	dnsEdit = app.CreateTextEdit( "208.67.222.222",1,-1,"" );
	dnsEdit.SetHint("Hint: OpenDNS server - 208.67.222.222" );
	dnsEdit.SetTextColor( "Black" );
	layBody.AddChild( dnsEdit );
	app.AddLayout( layMain );
	txt3 = app.CreateText( "System IP Info:" ,1, -1,"Left");
	txt3.SetTextSize( 20 );
	txt3.SetTextColor( "Red" );
	layBody.AddChild( txt3 );
	//txt3.Hide();
	resultEdit = app.CreateText( "" ,1,-1,"MultiLine,Left")
	resultEdit.SetTextSize( 20 );
	resultEdit.SetTextColor( "Black" );
	layBody.AddChild( resultEdit );
//	resultEdit.Hide();
	layB = app.CreateLayout( "Linear", "Horizontal,FillXY" );
	setBtn = app.CreateButton( "Set DNS" , 1/3, -1);
  layB.AddChild( setBtn );
  setBtn.SetOnTouch( setDNS );
	clearBtn = app.CreateButton( "Clear",1/3,-1 );
	clearBtn.SetOnTouch(clear);
	deleteBtn = app.CreateButton( "Flush DNS" , 1/3);
	layB.AddChild( clearBtn );
		layB.AddChild( deleteBtn );
	layMain.AddChild( layB );
	deleteBtn.SetOnTouch( flushDNS);
	devText = app.CreateText( "Developer:  gauravssnl" );
	devText.SetTextColor( "#ff0000" );
	devText.SetOnTouch( dev_OnTouch );
	
	layMain.AddChild( devText );
	createDrawer();
	app.AddDrawer( drawerScroll, "Left", drawerWidth );
//	alert(app.SysExec("ip route show"));
	showSystemInfo();
	print_info();
}








function clear()
{
	dnsEdit.SetText(  "");
//	resultEdit.SetText( "" );
}

function dev_OnTouch()
{
	app.ShowPopup( "Developer: gauravssnl.\nApp uses Google Maps API to find Location details." );
}


function OnBack()
{ 
//	layW.DestroyChild(  );
   if(curr ==2) 
   {
   curr=1;
   layW.Gone();
   }
  else  if(curr == 1)
   {
    curr = -1;
   app.ShowPopup( "Press Back Key again to exit" );
    app.EnableBackKey( true );
    }
   
	//layT.Show();
	//OnStart();
}


function createDrawer()
{
	drawerWidth = 0.75
	drawerScroll = app.CreateScroller( drawerWidth,1  );
	drawerScroll.SetBackColor( "#ffffff" );
	layDrawer= app.CreateLayout( "Linear", "Left" );
	drawerScroll.AddChild( layDrawer );
	layDrawerTop = app.CreateLayout( "Absolute" );
	layDrawerTop.SetSize( drawerWidth, 0.23 );
	layDrawerTop.SetBackGradient( "#ff000f", "#ffff00" );
	layDrawer.AddChild( layDrawerTop );
	
	img = app.CreateImage( "Img/DNSChanger.png", 0.15);
	img.SetPosition( drawerWidth * 0.06 ,0.04 );
	layDrawerTop.AddChild( img );
	
	appt =  app.CreateText( "DNSChanger" ,-1,-1, "Bold");
	appt.SetPosition( drawerWidth * 0.3,  0.06 );
	appt.SetTextSize(21,  "dip");
	layDrawerTop.AddChild( appt );
	
	dev = app.CreateText( "gauravssnl" );
	dev.SetPosition( drawerWidth*0.07, 0.155 );
	dev.SetTextColor( "#22ff22" );
	dev.SetTextSize( 18, "dip" );
	layDrawerTop.AddChild( dev );
	email = app.CreateText( "gaurav.ssnl@gmail.com" );
	email.SetPosition( drawerWidth * 0.07, 0.185 );
	email.SetTextColor( "Black" );
	layDrawerTop.AddChild( email );
	
	layMenu = app.CreateLayout( "Linear", "Left" );
	layDrawer.AddChild( layMenu );
	lstdata = "About:: [fa-info-circle] ,Feedback:: [fa-pencil]";
	listMenu1 = app.CreateList(lstdata, drawerWidth, -1 ,"Menu,Expand");
	listMenu1.SetOnTouch( listMenu_OnTouch );
	layMenu.AddChild( listMenu1 );
}


function listMenu_OnTouch(title, body, type, index)
{
   app.CloseDrawer(  );
   if(this == listMenu1)
   {
      if(title == "About") about();
      else if(title == "Feedback") feedback();
   }
}

function about()
{
	dlg = app.CreateDialog( "About" );
	layDlg = app.CreateLayout( "Linear", "Vertical,Center" );
	layDlg.SetBackGradient( "#eeeeee", "#ffffff" );
	layDlg.SetSize( 0.9,0.7);
	dlg.AddLayout( layDlg );
	msg= "DNSChanger  App  by <a href= https://gauravssnl.wordpress.com>gauravssnl<a><br/>E-mail: <a href= mailto:gaurav.snl@gmail.com?subject=DNSChangerApp> gaurav.ssnl@gmail.com</a> <br><br/> \
	This app can be used to set DNS for mobile/WiFi network on Android phone.<br><br>  \
	Android has no option of setting DNS for mobile internet, so this app can help you to set DNS in that case. <br> <br>  \
	This App requires root access as we need to use iptables. <br><br>  \
	Advantage: No Android VPN technique, no battery loss. <br><br> \
	DroidScript(JavaScript) has been used to develop this App."; 
	txt = app.CreateText( msg ,0.9, -1,"MultiLine,html,link,");
	txt.SetTextSize( 20 );
	txt.SetTextColor( "#ff0000" );
	txt.SetPadding( 0.05,0.0,0.05,0.0 );
	layDlg.AddChild( txt );
	dlg.Show();
}

function feedback()
{
	app.OpenUrl( "mailto:gaurav.ssnl@gmail.com?subject=LocateMeApp");
}


function sideBtn_OnTouch()
{
	 app.OpenDrawer( "Left" );
}

function print(msg, end = "\n") {
if(resultEdit.GetText())
resultEdit.SetText( resultEdit.GetText()+ end +  msg );
else
resultEdit.SetText(msg );

}

function showSystemInfo() {
resultEdit.SetText("" );
res =exec("ip route show")
if(res) {
for(i=0;i<=70;i++) print("-", end = "");


res = res.split(" ");
print("Gateway \t\t\t" + res[0])
ip = app.GetIPAddress();
if(ip === "0.0.0.0")  dev = "rmnet_data0(Mobile Internet)";
else dev = "wlan0(WiFi)"
print(res[1] + "\t\t \t\t\t\t\t\t\t " + dev);
print(res[4] +" \t\t \t\t\t\t\t " + res[5]);
print(res[7] + "\t\t \t\t\t\t\t " + res[8]);
print(res[10] + "\t\t \t\t\t\t\t\t    " + res[11] + "\n");
for(i=0;i<=70;i++) print("-", end = "");
}

else
print("Your are not connected to internet.\nPlease, switch on internet connection first.\n\n");
}

function exec(cmd) {
return app.SysExec(cmd);
}

function setDNS() {
server = dnsEdit.GetText();

if(ValidateIPaddress(server) ){
//clearActionData();
flushDNS();
print("Routing DNS request to server : " + server);
app.SysExec( "su -c iptables -t nat -I OUTPUT -p udp --dport 53 -j DNAT --to-destination " + server );
app.SysExec( "su -c iptables -t nat -I OUTPUT -p tcp --dport 53 -j DNAT --to-destination " + server );

print("Routing DNS request to server completed");
}

}

function flushDNS() {
clearActionData();
showSystemInfo();
print("Flushing Iptables NAT rules");
app.SysExec("su -c iptables -t nat -F");
print("NAT rule flushed");
}

function ValidateIPaddress(ipaddress) {
 if(!ipaddress) {
 alert("Empty DNS address!")  
  return (false)  
 }
 return true;
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
    return (true)  
  }  
  alert("You have entered an invalid DNS address!")  
  return (false)  
}  

function clearActionData() {
data = resultEdit.GetText();
lastIndex = data.lastIndexOf("-");
resultEdit.SetText( data.substring(0, lastIndex) );

}

function print_info() {
print("This application requires rooted phone.\n Iptables should also be installed(busybox can help).");
}