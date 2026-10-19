(()=>{
  async function count(){
    if(navigator.globalPrivacyControl||navigator.doNotTrack==='1')return;
    try{
      const storage=localStorage,day=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Chisinau'}).format(new Date());
      if(storage.getItem('05pub-visit-day')===day)return;
      let id=storage.getItem('05pub-visitor');
      if(!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(id||'')){id=crypto.randomUUID();storage.setItem('05pub-visitor',id)}
      const config=await fetch('connection.json',{cache:'no-store',signal:AbortSignal.timeout(5000)}).then(r=>r.json());
      if(!/^https:\/\/[a-z0-9-]+\.[a-z0-9-]+\.workers\.dev$/.test(config.apiUrl||''))return;
      const response=await fetch(config.apiUrl+'/visits',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id}),signal:AbortSignal.timeout(8000)});
      if(response.ok)storage.setItem('05pub-visit-day',day);
    }catch{/* Menu and reservations remain usable if counting is unavailable. */}
  }
  if(document.visibilityState==='visible')count();
  else document.addEventListener('visibilitychange',function visible(){if(document.visibilityState==='visible'){document.removeEventListener('visibilitychange',visible);count()}});
})();
