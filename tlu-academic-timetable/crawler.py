from bs4 import BeautifulSoup
from ics import Calendar, Event
from datetime import datetime, timedelta

html = '''
<table class="asio_basic " border="1" bgcolor="#efefef" cellspacing="0" cellpadding="2"><tbody><tr bgcolor="#eeeeee" valign="top">
			<th><br></th><th class=""><span class="hdr_weekday"><font face="arial, helvetica" size="-1">Monday</font></span><br><span class="hdr_date"><font size="-2">23.09.2024</font></span></th><th class=""><span class="hdr_weekday"><font face="arial, helvetica" size="-1">Tuesday</font></span><br><span class="hdr_date"><font size="-2">24.09.2024</font></span></th><th class=""><span class="hdr_weekday"><font face="arial, helvetica" size="-1">Wednesday</font></span><br><span class="hdr_date"><font size="-2">25.09.2024</font></span></th><th class=""><span class="hdr_weekday"><font face="arial, helvetica" size="-1">Thursday</font></span><br><span class="hdr_date"><font size="-2">26.09.2024</font></span></th><th class=""><span class="hdr_weekday"><font face="arial, helvetica" size="-1">Friday</font></span><br><span class="hdr_date"><font size="-2">27.09.2024</font></span></th><th class=""><span class="hdr_weekday"><font face="arial, helvetica" size="-1">Saturday</font></span><br><span class="hdr_date"><font size="-2">28.09.2024</font></span></th><th class=""><span class="hdr_weekday"><font face="arial, helvetica" size="-1">Sunday</font></span><br><span class="hdr_date"><font size="-2">29.09.2024</font></span></th></tr><tr bgcolor="#ffffff" valign="top"><td rowspan="2" class="caltime" nowrap="" height="20">8:00</td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 8:00-08:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Tuesday at 8:00-08:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Wednesday at 8:00-08:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 8:00-08:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 8:00-08:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 8:00-08:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 8:00-08:30"></td>
</tr>
<tr bgcolor="#ffffff" valign="top"><td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 8:30-9:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Tuesday at 8:30-9:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Wednesday at 8:30-9:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 8:30-9:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 8:30-9:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 8:30-9:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 8:30-9:00"></td>
</tr>
<tr bgcolor="#efefef" valign="top"><td rowspan="2" class="caltime" nowrap="" height="20">9:00</td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 9:00-09:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Tuesday at 9:00-09:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Wednesday at 9:00-09:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 9:00-09:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 9:00-09:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 9:00-09:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 9:00-09:30"></td>
</tr>
<tr bgcolor="#efefef" valign="top"><td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 9:30-10:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Tuesday at 9:30-10:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Wednesday at 9:30-10:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 9:30-10:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 9:30-10:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 9:30-10:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 9:30-10:00"></td>
</tr>
<tr bgcolor="#ffffff" valign="top"><td rowspan="2" class="caltime" nowrap="" height="20">10:00</td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 10:00-10:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Tuesday at 10:00-10:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Wednesday at 10:00-10:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 10:00-10:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 10:00-10:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 10:00-10:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 10:00-10:30"></td>
</tr>
<tr bgcolor="#ffffff" valign="top"><td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 10:30-11:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Tuesday at 10:30-11:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Wednesday at 10:30-11:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 10:30-11:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 10:30-11:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 10:30-11:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 10:30-11:00"></td>
</tr>
<tr bgcolor="#efefef" valign="top"><td rowspan="2" class="caltime" nowrap="" height="20">11:00</td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 11:00-11:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Tuesday at 11:00-11:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Wednesday at 11:00-11:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 11:00-11:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 11:00-11:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 11:00-11:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 11:00-11:30"></td>
</tr>
<tr bgcolor="#efefef" valign="top"><td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 11:30-12:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Tuesday at 11:30-12:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Wednesday at 11:30-12:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 11:30-12:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 11:30-12:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 11:30-12:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 11:30-12:00"></td>
</tr>
<tr bgcolor="#ffffff" valign="top"><td rowspan="2" class="caltime" nowrap="" height="20">12:00</td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 12:00-12:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Tuesday at 12:00-12:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Wednesday at 12:00-12:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 12:00-12:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 12:00-12:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 12:00-12:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 12:00-12:30"></td>
</tr>
<tr bgcolor="#ffffff" valign="top"><td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 12:30-13:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Tuesday at 12:30-13:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Wednesday at 12:30-13:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 12:30-13:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 12:30-13:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 12:30-13:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 12:30-13:00"></td>
</tr>
<tr bgcolor="#efefef" valign="top"><td rowspan="2" class="caltime" nowrap="" height="20">13:00</td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 13:00-13:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Tuesday at 13:00-13:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Wednesday at 13:00-13:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 13:00-13:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 13:00-13:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 13:00-13:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 13:00-13:30"></td>
</tr>
<tr bgcolor="#efefef" valign="top"><td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 13:30-14:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Tuesday at 13:30-14:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Wednesday at 13:30-14:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 13:30-14:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 13:30-14:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 13:30-14:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 13:30-14:00"></td>
</tr>
<tr bgcolor="#ffffff" valign="top"><td rowspan="2" class="caltime" nowrap="" height="20">14:00</td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 14:00-14:30"></td>
<td rowspan="4" bgcolor="#CCFFCC" width="80" class="clear cvar cmb cmbp" data-ids="2431660">
				<table cellspacing="0" border="0" cellpadding="2" width="80">
				<tbody><tr><td style="font-family:arial,verdana,helvetica;font-size:10px;"> 
				<div><a href="javascript:void(null);" onclick="window.open('../kokvar/kal_selaus.php?func=kv_uusi&amp;pvm=240924&amp;tila=3215&amp;varaus=2431660&amp;blokit=&amp;guest=intranet%2Ftu&amp;minimal=1725133729&amp;lang=eng&amp;ss_ttkal=&amp;guest=intranet%2Ftu&amp;rz=1','','width=900,height=720,toolbar=no,navbar=no,top=1,left=10,scrollbars,resizable');"><font color="#404060"><b>14:15 - 15:45<br>EKY6109.HT Estonian A1 and Estonian Culture </b><br>S-423 <br></font></a></div>Nilson Lea </td></tr></tbody></table>
				
			      </td>
<td rowspan="4" bgcolor="#CCFFCC" width="80" class="clear cvar cmb cmbp" data-ids="2431661">
				<table cellspacing="0" border="0" cellpadding="2" width="80">
				<tbody><tr><td style="font-family:arial,verdana,helvetica;font-size:10px;"> 
				<div><a href="javascript:void(null);" onclick="window.open('../kokvar/kal_selaus.php?func=kv_uusi&amp;pvm=240925&amp;tila=3215&amp;varaus=2431661&amp;blokit=&amp;guest=intranet%2Ftu&amp;minimal=1725133729&amp;lang=eng&amp;ss_ttkal=&amp;guest=intranet%2Ftu&amp;rz=1','','width=900,height=720,toolbar=no,navbar=no,top=1,left=10,scrollbars,resizable');"><font color="#404060"><b>14:15 - 15:45<br>EKY6109.HT Estonian A1 and Estonian Culture </b><br>S-423 <br></font></a></div>Nilson Lea </td></tr></tbody></table>
				
			      </td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 14:00-14:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 14:00-14:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 14:00-14:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 14:00-14:30"></td>
</tr>
<tr bgcolor="#ffffff" valign="top"><td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 14:30-15:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 14:30-15:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 14:30-15:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 14:30-15:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 14:30-15:00"></td>
</tr>
<tr bgcolor="#efefef" valign="top"><td rowspan="2" class="caltime" nowrap="" height="20">15:00</td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 15:00-15:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 15:00-15:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 15:00-15:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 15:00-15:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 15:00-15:30"></td>
</tr>
<tr bgcolor="#efefef" valign="top"><td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Monday at 15:30-16:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Thursday at 15:30-16:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 15:30-16:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 15:30-16:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 15:30-16:00"></td>
</tr>
<tr bgcolor="#ffffff" valign="top"><td rowspan="2" class="caltime" nowrap="" height="20">16:00</td>
<td rowspan="8" bgcolor="#FFFF66" width="80" class="clear cvar cmb cmbp" data-ids="2421464">
				<table cellspacing="0" border="0" cellpadding="2" width="80">
				<tbody><tr><td style="font-family:arial,verdana,helvetica;font-size:10px;"> 
				<div><a href="javascript:void(null);" onclick="window.open('../kokvar/kal_selaus.php?func=kv_uusi&amp;pvm=240923&amp;tila=7872&amp;varaus=2421464&amp;blokit=&amp;guest=intranet%2Ftu&amp;minimal=1725133729&amp;lang=eng&amp;ss_ttkal=&amp;guest=intranet%2Ftu&amp;rz=1','','width=900,height=720,toolbar=no,navbar=no,top=1,left=10,scrollbars,resizable');"><font color="#404060"><b>16:15 - 19:45<br>IFI7346.DT Introduction to Digital Learning Games </b><br>A-402 <br></font></a></div>Sillaots Martin </td></tr></tbody></table>
				
			      </td>
<td rowspan="4" bgcolor="#FFFF66" width="80" class="clear cvar cmb cmbp" data-ids="2454053">
				<table cellspacing="0" border="0" cellpadding="2" width="80">
				<tbody><tr><td style="font-family:arial,verdana,helvetica;font-size:10px;"> 
				<div><a href="javascript:void(null);" onclick="window.open('../kokvar/kal_selaus.php?func=kv_uusi&amp;pvm=240924&amp;tila=3248&amp;varaus=2454053&amp;blokit=&amp;guest=intranet%2Ftu&amp;minimal=1725133729&amp;lang=eng&amp;ss_ttkal=&amp;guest=intranet%2Ftu&amp;rz=1','','width=900,height=720,toolbar=no,navbar=no,top=1,left=10,scrollbars,resizable');"><font color="#404060"><b>16:15 - 17:45<br>IFI7366.DT Pedagogical and Psychological Factors of Developing Learning Games </b><br>T-409 <br></font></a></div>Jesmin Triinu </td></tr></tbody></table>
				
			      </td>
<td rowspan="4" bgcolor="#FFFF66" width="80" class="clear cvar cmb cmbp" data-ids="2420382">
				<table cellspacing="0" border="0" cellpadding="2" width="80">
				<tbody><tr><td style="font-family:arial,verdana,helvetica;font-size:10px;"> 
				<div><a href="javascript:void(null);" onclick="window.open('../kokvar/kal_selaus.php?func=kv_uusi&amp;pvm=240925&amp;tila=3203&amp;varaus=2420382&amp;blokit=&amp;guest=intranet%2Ftu&amp;minimal=1725133729&amp;lang=eng&amp;ss_ttkal=&amp;guest=intranet%2Ftu&amp;rz=1','','width=900,height=720,toolbar=no,navbar=no,top=1,left=10,scrollbars,resizable');"><font color="#404060"><b>16:15 - 17:45<br>IFI7319.DT 2D Graphics for Computer Games </b><br>M-543 <br></font></a></div>Hô Anni </td></tr></tbody></table>
				
			      </td>
<td rowspan="8" bgcolor="#FFFF66" width="80" class="clear cvar cmb cmbp" data-ids="2427130">
				<table cellspacing="0" border="0" cellpadding="2" width="80">
				<tbody><tr><td style="font-family:arial,verdana,helvetica;font-size:10px;"> 
				<div><a href="javascript:void(null);" onclick="window.open('../kokvar/kal_selaus.php?func=kv_uusi&amp;pvm=240926&amp;tila=7872&amp;varaus=2427130&amp;blokit=&amp;guest=intranet%2Ftu&amp;minimal=1725133729&amp;lang=eng&amp;ss_ttkal=&amp;guest=intranet%2Ftu&amp;rz=1','','width=900,height=720,toolbar=no,navbar=no,top=1,left=10,scrollbars,resizable');"><font color="#404060"><b>16:15 - 19:45<br>IFI7333.DT Psychological Aspects of Game Design </b><br>A-402 <br></font></a></div>Jesmin Triinu </td></tr></tbody></table>
				
			      </td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 16:00-16:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 16:00-16:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 16:00-16:30"></td>
</tr>
<tr bgcolor="#ffffff" valign="top"><td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 16:30-17:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 16:30-17:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 16:30-17:00"></td>
</tr>
<tr bgcolor="#efefef" valign="top"><td rowspan="2" class="caltime" nowrap="" height="20">17:00</td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 17:00-17:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 17:00-17:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 17:00-17:30"></td>
</tr>
<tr bgcolor="#efefef" valign="top"><td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 17:30-18:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 17:30-18:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 17:30-18:00"></td>
</tr>
<tr bgcolor="#ffffff" valign="top"><td rowspan="2" class="caltime" nowrap="" height="20">18:00</td>
<td rowspan="4" bgcolor="#FFFF66" width="80" class="clear cvar cmb cmbp" data-ids="2421479">
				<table cellspacing="0" border="0" cellpadding="2" width="80">
				<tbody><tr><td style="font-family:arial,verdana,helvetica;font-size:10px;"> 
				<div><a href="javascript:void(null);" onclick="window.open('../kokvar/kal_selaus.php?func=kv_uusi&amp;pvm=240924&amp;tila=3191&amp;varaus=2421479&amp;blokit=&amp;guest=intranet%2Ftu&amp;minimal=1725133729&amp;lang=eng&amp;ss_ttkal=&amp;guest=intranet%2Ftu&amp;rz=1','','width=900,height=720,toolbar=no,navbar=no,top=1,left=10,scrollbars,resizable');"><font color="#404060"><b>18:15 - 19:45<br>IFI7302.DT Basics of Game Development </b><br>A-303 <br></font></a></div>Elshenawy Ahmed Mohamed Said Anwar </td></tr></tbody></table>
				
			      </td>
<td rowspan="4" bgcolor="#CCFFCC" width="80" class="clear cvar cmb cmbp" data-ids="2444754">
				<table cellspacing="0" border="0" cellpadding="2" width="80">
				<tbody><tr><td style="font-family:arial,verdana,helvetica;font-size:10px;"> 
				<div><a href="javascript:void(null);" onclick="window.open('../kokvar/kal_selaus.php?func=kv_uusi&amp;pvm=240925&amp;tila=9427&amp;varaus=2444754&amp;blokit=&amp;guest=intranet%2Ftu&amp;minimal=1725133729&amp;lang=eng&amp;ss_ttkal=&amp;guest=intranet%2Ftu&amp;rz=1','','width=900,height=720,toolbar=no,navbar=no,top=1,left=10,scrollbars,resizable');"><font color="#404060"><b>18:15 - 19:45<br>EKY6109.HT Estonian A1 and Estonian Culture </b><br>e-HT <br></font></a></div>Viires Piret </td></tr></tbody></table>
				
			      </td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 18:00-18:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 18:00-18:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 18:00-18:30"></td>
</tr>
<tr bgcolor="#ffffff" valign="top"><td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 18:30-19:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 18:30-19:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 18:30-19:00"></td>
</tr>
<tr bgcolor="#efefef" valign="top"><td rowspan="2" class="caltime" nowrap="" height="20">19:00</td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 19:00-19:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 19:00-19:30"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 19:00-19:30"></td>
</tr>
<tr bgcolor="#efefef" valign="top"><td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Friday at 19:30-20:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Saturday at 19:30-20:00"></td>
<td width="80" class=""><img src="pixel.gif" class="spc" border="0" width="80" height="16" alt="" title="Sunday at 19:30-20:00"></td>
</tr>
</tbody></table>
'''
soup = BeautifulSoup(html, 'html.parser')

# Initialize Calendar
calendar = Calendar()

# Assume the dates are consistent and align with the table headers
base_date = datetime(2024, 9, 23)  # Starting from Monday
time_slots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30']

for i, day in enumerate(soup.find_all('th', class_='hdr_weekday')):
    date = base_date + timedelta(days=i)
    for j, slot in enumerate(time_slots):
        time_start = datetime.combine(date, datetime.strptime(slot, "%H:%M").time())
        time_end = time_start + timedelta(minutes=30)
        event = Event()
        event.name = f"Event on {day.text.strip()} at {slot}-{time_end.strftime('%H:%M')}"
        event.begin = time_start.isoformat()
        event.end = time_end.isoformat()
        calendar.events.add(event)

# Export to .ics file
with open('calendar.ics', 'w') as f:
    f.writelines(calendar)