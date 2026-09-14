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
        header?.classList.toggle("scrolled",scrollY>10);
        backTop?.classList.toggle("visible",scrollY>500);
    };
    onScroll(); addEventListener("scroll",onScroll,{passive:true});
    backTop?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

    const reveals=document.querySelectorAll(".reveal");
    const observer=new IntersectionObserver((entries,obs)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){entry.target.classList.add("show");obs.unobserve(entry.target)}
        });
    },{threshold:.1});
    reveals.forEach(el=>observer.observe(el));

    // Portfolio filter
    const buttons=document.querySelectorAll(".filter-btn");
    const cards=document.querySelectorAll(".project-card");
    const empty=document.getElementById("emptyState");
    buttons.forEach(button=>{
        button.addEventListener("click",()=>{
            buttons.forEach(b=>b.classList.remove("active"));
            button.classList.add("active");
            const filter=button.dataset.filter;
            let count=0;
            cards.forEach(card=>{
                const show=filter==="all" || card.dataset.category===filter;
                card.style.display=show?"":"none";
                if(show) count++;
            });
            empty.style.display=count?"none":"block";
        });
    });

    // Detail modal dengan Deskripsi yang Benar
    const data={
        sigadit:{k:"01 / WEB-GIS",t:"Web-GIS SIGADIT",d:"Sistem Informasi Geografis untuk pemetaan potensi kecanduan gadget di Kecamatan Sobang. Mengimplementasikan algoritma K-Means Clustering untuk pengelompokan data spasial.",tags:["Laravel","Leaflet.js","K-Means"]},
        earsip_kominfo:{k:"02 / WEB APP",t:"Sistem E-Arsip DISKOMSANTIK",d:"Aplikasi pengarsipan dokumen digital yang dirancang khusus untuk mempermudah proses digitalisasi dan manajemen arsip pemerintahan saat magang di DISKOMSANTIK.",tags:["PHP Native","MySQL","Bootstrap"]},
        sdisi:{k:"03 / WEB APP",t:"SPK Kedisiplinan (S-DISI)",d:"Sistem Pendukung Keputusan berbasis web untuk membantu pihak sekolah dalam menilai dan mengelola tingkat kedisiplinan siswa menggunakan metode perhitungan SPK MOORA.",tags:["PHP","MySQL","SPK MOORA"]},
        gigi:{k:"04 / WEB APP",t:"Sistem Pakar Diagnosa Gigi",d:"Aplikasi sistem pakar berbasis web yang membantu mendiagnosis penyakit gigi dan mulut berdasarkan prior dan likelihood pakar menggunakan metode Naive Bayes.",tags:["PHP","MySQL","Naive Bayes"]},
        inventaris:{k:"05 / WEB APP",t:"Sistem Inventaris Barang DPRD",d:"Sistem pendukung keputusan inventaris untuk memantau proses pengadaan, mengelola data stok barang masuk dan keluar di lingkungan Sekretariat DPRD.",tags:["PHP / Laravel","MySQL","Dashboard"]},
        earsip_dprd:{k:"06 / WEB APP",t:"E-Arsip Digital DPRD",d:"Platform pengarsipan digital untuk tata kelola surat masuk, surat keluar, dan manajemen laporan aktivitas kearsipan di lingkungan Sekretariat DPRD Pandeglang.",tags:["Web App","PHP","MySQL"]},
        custom:{k:"07 / FULLSTACK",t:"Aplikasi Web Kustom",d:"Layanan pengembangan sistem informasi dan aplikasi web kustom yang dirancang khusus menyesuaikan alur bisnis dan kebutuhan spesifik klien atau instansi.",tags:["Fullstack","System Analysis"]},
        design:{k:"08 / CREATIVE",t:"Desain Grafis & Cetak",d:"Jasa pembuatan aset visual profesional untuk kebutuhan promosi, identitas visual, dan acara, meliputi desain banner, spanduk, logo instansi, hingga materi KKN.",tags:["CorelDRAW","Photoshop","Canva"]}
    };

    const modal=document.getElementById("projectModal"), kicker=document.getElementById("modalKicker"), title=document.getElementById("modalTitle"), text=document.getElementById("modalText"), tags=document.getElementById("modalTags");
    
    document.querySelectorAll("[data-modal]").forEach(btn=>btn.addEventListener("click",()=>{
        const item=data[btn.dataset.modal]; if(!item)return;
        kicker.textContent=item.k; title.textContent=item.t; text.textContent=item.d;
        tags.innerHTML=item.tags.map(x=>`<span>${x}</span>`).join("");
        modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
    }));

    document.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",()=>{
        modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";
    }));

    addEventListener("keydown",e=>{
        if(e.key==="Escape" && modal.classList.contains("open")){
            modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";
        }
    });
});