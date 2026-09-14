document.addEventListener("DOMContentLoaded",()=>{
    const header=document.getElementById("header");
    const menuButton=document.getElementById("menuButton");
    const menu=document.getElementById("menu");
    const backTop=document.getElementById("backTop");

    menuButton?.addEventListener("click",()=>{
        const open=menu.classList.toggle("open");
        menuButton.setAttribute("aria-expanded",String(open));
        menuButton.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';
    });

    menu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
        menu.classList.remove("open");
        menuButton.setAttribute("aria-expanded","false");
        menuButton.innerHTML='<i class="fa-solid fa-bars"></i>';
    }));

    const onScroll=()=>{
        header?.classList.toggle("scrolled",window.scrollY>10);
        backTop?.classList.toggle("visible",window.scrollY>500);
    };
    onScroll();
    window.addEventListener("scroll",onScroll,{passive:true});
    backTop?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

    const reveals=document.querySelectorAll(".reveal");
    const bars=document.querySelectorAll(".bar i");
    const observer=new IntersectionObserver((entries,obs)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("show");
                if(entry.target.classList.contains("skill-panel")){
                    bars.forEach(bar=>bar.style.width=bar.dataset.width);
                }
                obs.unobserve(entry.target);
            }
        });
    },{threshold:.12});
    reveals.forEach(el=>observer.observe(el));

    // Fallback for skill animation if the panel is already visible.
    const skillPanel=document.querySelector(".skill-panel");
    if(skillPanel && "IntersectionObserver" in window===false){
        bars.forEach(bar=>bar.style.width=bar.dataset.width);
    }
});