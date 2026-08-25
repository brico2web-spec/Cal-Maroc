const holidays = [
  {id:'new-year',name:'رأس السنة الميلادية',category:'وطنية',date:'01-01',days:1,working:true,description:'بداية السنة الميلادية الجديدة.'},
  {id:'manifesto',name:'ذكرى تقديم وثيقة الاستقلال',category:'وطنية',date:'01-11',days:1,working:true,description:'ذكرى وطنية مرتبطة بتاريخ الحركة الوطنية المغربية.'},
  {id:'amazigh',name:'فاتح السنة الأمازيغية',category:'وطنية',date:'01-14',days:1,working:true,description:'رأس السنة الأمازيغية، عطلة وطنية رسمية مؤدى عنها.'},
  {id:'fitr',name:'عيد الفطر',category:'دينية',date:'03-20',days:2,working:true,approx:true,description:'التاريخ تقريبي حسب ثبوت رؤية الهلال.'},
  {id:'labor',name:'عيد الشغل',category:'وطنية',date:'05-01',days:1,working:true,description:'مناسبة للاحتفاء بالعمال.'},
  {id:'adha',name:'عيد الأضحى',category:'دينية',date:'05-27',days:2,working:true,approx:true,description:'التاريخ تقريبي حسب ثبوت رؤية الهلال.'},
  {id:'islamic-new-year',name:'رأس السنة الهجرية',category:'دينية',date:'06-16',days:1,working:true,approx:true,description:'التاريخ تقريبي حسب ثبوت رؤية الهلال.'},
  {id:'throne',name:'عيد العرش',category:'وطنية',date:'07-30',days:1,working:true,description:'الاحتفال بذكرى تربع جلالة الملك على العرش.'},
  {id:'dakhla',name:'ذكرى استرجاع وادي الذهب',category:'وطنية',date:'08-14',days:1,working:true,description:'ذكرى وطنية.'},
  {id:'revolution',name:'ذكرى ثورة الملك والشعب',category:'وطنية',date:'08-20',days:1,working:true,description:'ذكرى وطنية خالدة.'},
  {id:'youth',name:'عيد الشباب',category:'وطنية',date:'08-21',days:1,working:true,description:'مناسبة للاحتفاء بالشباب المغربي.'},
  {id:'mawlid',name:'المولد النبوي الشريف',category:'دينية',date:'08-25',days:2,working:true,approx:true,description:'التاريخ تقريبي حسب ثبوت رؤية الهلال.'},
  {id:'green-march',name:'ذكرى المسيرة الخضراء',category:'وطنية',date:'11-06',days:1,working:true,description:'ذكرى المسيرة الخضراء المظفرة.'},
  {id:'independence',name:'عيد الاستقلال',category:'وطنية',date:'11-18',days:1,working:true,description:'الاحتفال بذكرى استقلال المغرب.'},
  {id:'school-break-1',name:'الفترة البينية الأولى',category:'مدرسية',date:'10-19',endDate:'10-26',days:8,description:'عطلة مدرسية للموسم الدراسي 2025-2026.'},
  {id:'school-break-2',name:'الفترة البينية الثانية',category:'مدرسية',date:'12-07',endDate:'12-14',days:8,description:'عطلة مدرسية للموسم الدراسي 2025-2026.'},
  {id:'mid-year',name:'عطلة منتصف السنة الدراسية',category:'مدرسية',date:'01-25',endDate:'02-01',days:8,description:'عطلة منتصف السنة الدراسية 2025-2026.'},
  {id:'school-break-3',name:'الفترة البينية الثالثة',category:'مدرسية',date:'03-15',endDate:'03-22',days:8,description:'عطلة مدرسية للموسم الدراسي 2025-2026.'},
  {id:'school-break-4',name:'الفترة البينية الرابعة',category:'مدرسية',date:'05-03',endDate:'05-10',days:8,description:'عطلة مدرسية للموسم الدراسي 2025-2026.'},
  {id:'summer',name:'العطلة الصيفية',category:'مدرسية',date:'07-01',endDate:'08-31',days:62,description:'الفترة الصيفية بين موسمين دراسيين.'}
];
const now = new Date();
const dateOf = (h) => { const [m,d] = h.date.split('-').map(Number); const date = new Date(now.getFullYear(),m-1,d); if(date < new Date(now.getFullYear(),now.getMonth(),now.getDate()-1)) date.setFullYear(now.getFullYear()+1); return date; };
const fmt = d => new Intl.DateTimeFormat('ar-MA-u-nu-latn',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(d);
const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-latn',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'Africa/Casablanca'});
let calendarMode = localStorage.getItem('calendarMode') || 'gregorian';
const datePair = d => calendarMode === 'hijri' ? `هجري: ${hijriFormatter.format(d)} · ميلادي: ${fmt(d)}` : `ميلادي: ${fmt(d)} · هجري: ${hijriFormatter.format(d)}`;
const remaining = d => Math.max(0,Math.ceil((new Date(d.getFullYear(),d.getMonth(),d.getDate())-new Date(now.getFullYear(),now.getMonth(),now.getDate()))/86400000));
const dateMonth = d => new Intl.DateTimeFormat('ar-MA-u-nu-latn',{month:'short'}).format(d);
const timeFormatter = new Intl.DateTimeFormat('ar-MA-u-nu-latn',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false,timeZone:'Africa/Casablanca'});
const dateFormatter = new Intl.DateTimeFormat('ar-MA-u-nu-latn',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'Africa/Casablanca'});
function updateClock(){const current=new Date();const time=document.querySelector('#liveTime');const date=document.querySelector('#liveDate');if(time) time.textContent=timeFormatter.format(current);if(date) date.textContent=calendarMode === 'hijri' ? `هجري: ${hijriFormatter.format(current)} · ميلادي: ${dateFormatter.format(current)}` : `ميلادي: ${dateFormatter.format(current)} · هجري: ${hijriFormatter.format(current)}`;}
updateClock();setInterval(updateClock,1000);
let filter = 'الكل';
const upcoming = holidays.map(h=>({...h,dateObj:dateOf(h)})).sort((a,b)=>a.dateObj-b.dateObj);
const next = upcoming[0];
const grid = document.querySelector('#holidayGrid');
const stats = document.querySelector('#stats');
const nextEl = document.querySelector('#nextHoliday');
nextEl.innerHTML = `<div class="next-top"><span class="next-label">المناسبة القادمة</span><span class="pill">${next.category} · ${next.days} ${next.days===1?'يوم':'أيام'}</span></div><h3>${next.name}</h3><div class="next-date">${datePair(next.dateObj)}</div><div class="next-bottom"><span class="next-days">يومًا متبقيًا</span><strong class="next-number">${remaining(next.dateObj)}</strong></div>`;
stats.innerHTML = [['وطنية',holidays.filter(x=>x.category==='وطنية').length],['دينية',holidays.filter(x=>x.category==='دينية').length],['وظيفية',holidays.filter(x=>x.working).length],['مدرسية',holidays.filter(x=>x.category==='مدرسية').length]].map(([label,value])=>`<div class="stat"><strong>${value}</strong><span>${label}</span></div>`).join('');
const filters = ['الكل','وطنية','دينية','وظيفية','مدرسية'];
document.querySelector('#filters').innerHTML = filters.map(x=>`<button class="filter ${x==='الكل'?'active':''}" data-filter="${x}">${x}</button>`).join('');
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{filter=btn.dataset.filter;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b===btn));render();}));
function render(){let list=filter==='الكل'?upcoming:filter==='وظيفية'?upcoming.filter(x=>x.working):upcoming.filter(x=>x.category===filter);grid.innerHTML=list.map(h=>{const tone=h.category==='مدرسية'?'gold':h.category==='دينية'?'green':'red';return `<article class="holiday-card" data-id="${h.id}"><div class="date-box ${tone}"><strong>${h.dateObj.getDate()}</strong><span>${dateMonth(h.dateObj)}</span></div><div class="holiday-info"><h3>${h.name}</h3><p>${datePair(h.dateObj)}</p><p class="duration">${h.days} ${h.days===1?'يوم':'أيام'} · ${h.category}</p></div><span class="arrow">‹</span></article>`}).join('');document.querySelectorAll('.holiday-card').forEach(card=>card.addEventListener('click',()=>openDetail(card.dataset.id)));}
function openDetail(id){const h=holidays.find(x=>x.id===id), d=dateOf(h);const end=new Date(d);end.setDate(end.getDate()+h.days-1);document.querySelector('#detailContent').innerHTML=`<div class="detail-icon">${h.category==='مدرسية'?'◐':'✦'}</div><div class="detail-content"><small class="kicker">${h.category}${h.working?' · عطلة وظيفية':''}</small><h2>${h.name}</h2><p>${h.description}${h.approx?' هذه المواعيد تقريبية.':''}</p><div class="detail-meta"><div class="meta-box"><small>تبدأ في</small><strong>${datePair(d)}</strong></div><div class="meta-box"><small>المدة</small><strong>${h.days} ${h.days===1?'يوم':'أيام'}</strong></div><div class="meta-box"><small>تنتهي في</small><strong>${datePair(end)}</strong></div></div></div>`;document.querySelector('#detailDialog').showModal();}
document.querySelector('#closeDialog').addEventListener('click',()=>document.querySelector('#detailDialog').close());
function toast(text){const el=document.querySelector('#toast');el.textContent=text;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2800)}
async function enableNotifications(){if(!('Notification' in window)){toast('المتصفح لا يدعم تنبيهات الويب');return}const permission=await Notification.requestPermission();if(permission==='granted'){localStorage.setItem('notifications','on');toast('تم تفعيل تنبيهات الموقع')}else toast('لم يتم منح إذن التنبيهات');}
document.querySelector('#enableBtn').addEventListener('click',enableNotifications);document.querySelector('#notifyTop').addEventListener('click',enableNotifications);
document.querySelectorAll('.calendar-btn').forEach(btn=>{btn.classList.toggle('active',btn.dataset.calendar===calendarMode);btn.addEventListener('click',()=>{calendarMode=btn.dataset.calendar;localStorage.setItem('calendarMode',calendarMode);document.querySelectorAll('.calendar-btn').forEach(b=>b.classList.toggle('active',b.dataset.calendar===calendarMode));updateClock();const nextDate=nextEl.querySelector('.next-date');if(nextDate) nextDate.textContent=datePair(next.dateObj);render();});});
render();
