const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

function setError(name,msg){
  const el = document.querySelector(`.error[data-for="${name}"]`);
  if(el) el.textContent = msg || "";
}

function isEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getRadio(name){
  const r = document.querySelector(`input[name="${name}"]:checked`);
  return r ? r.value : "";
}

function getChecks(name){
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)];
}

function validate(){

  ["name","email","phone","subject","contactMethod","services","message","consent"]
    .forEach(k=>setError(k,""));

  let ok = true;

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value;
  const method = getRadio("contactMethod");
  const services = getChecks("services");
  const message = form.message.value.trim();
  const consent = document.getElementById("consent").checked;

  if(name.length<2){
    setError("name","Enter full name");
    ok=false;
  }

  if(!isEmail(email)){
    setError("email","Enter valid email");
    ok=false;
  }

  if(!subject){
    setError("subject","Select subject");
    ok=false;
  }

  if(!method){
    setError("contactMethod","Choose contact method");
    ok=false;
  }

  if(services.length===0){
    setError("services","Select at least one service");
    ok=false;
  }

  if(message.length<10){
    setError("message","Minimum 10 characters");
    ok=false;
  }

  if(!consent){
    setError("consent","Required");
    ok=false;
  }

  return ok;
}

form.addEventListener("submit",e=>{
  e.preventDefault();

  if(!validate()){
    toast.style.display="none";
    return;
  }

  toast.textContent="Form submitted successfully (Demo)";
  toast.style.display="block";
  form.reset();
});
