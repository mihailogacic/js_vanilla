class Clan_teretane
{
    id
    ime_prezime
    godina_rodjenja
    email
    vrsta_clana
    clanarina
    
    constructor(id, ime_prezime, godina_rodjenja, email, vrsta_clana, clanarina)
    {
        this.id=id
        this.ime_prezime=ime_prezime
        this.godina_rodjenja=godina_rodjenja
        this.email=email
        this.vrsta_clana=vrsta_clana
        this.clanarina=clanarina
    }
    
    static novo_polje(text){
        var novi_td=document.createElement('td')
        novi_td.innerText=text
        return novi_td
    }
}

if(localStorage.getItem('svi_clanovi')==null)
{
    c1=new Clan_teretane(1, 'Mihailo Gacic', 2001, 'mgacic4620s@raf.rs', 'regularni',3000)
    c2=new Clan_teretane(2, 'Dusan Jovicic', 2002, 'djovicic321s@raf.rs', 'povlasceni', 2400)
    c3=new Clan_teretane(3, 'Dejan Abramovic', 1999, 'dabramovic1821s@raf.rs', 'regularni', 3000)
    niz_clanova=[c1, c2, c3]

    localStorage.setItem('svi_clanovi', JSON.stringify(niz_clanova))
}

addEventListener('load', init)

var dugme_za_dodavanje_clana
var interval=null
var timer
var tacan_rezultat
var trenutna_duzina_tajmera=100
var flag=1

function init()
{
    console.log('funkcija init je pokrenuta')

    var tabela=document.getElementById('tabela')
    var niz_svih_clanova=JSON.parse(localStorage.getItem('svi_clanovi')) || []
    var brojac=0

    for (const clan of niz_svih_clanova) {

        var novi_tr=document.createElement('tr')

        for (const key in clan) 
        {
            if (Object.hasOwnProperty.call(clan, key)) {
                const element=clan[key];
                var novi_td=Clan_teretane.novo_polje(element)
                novi_tr.appendChild(novi_td)
            }
        }
        
        var td_update=Clan_teretane.novo_polje('UPDATE')
        td_update.id='update_'+brojac
        novi_tr.appendChild(td_update)

        var td_delete=Clan_teretane.novo_polje('DELETE')
        novi_tr.appendChild(td_delete)
        td_delete.id='delete_'+brojac

        tabela.appendChild(novi_tr)
        brojac++

        td_delete.addEventListener('click', obrisi)
        td_update.addEventListener('click', update_forma)
    }
    dugme_za_dodavanje_clana=document.getElementById('dugme_dodaj_clana')
    dugme_za_dodavanje_clana.addEventListener('click', dodaj_clana)
}

function dodaj_clana(event)
{
    console.log('funkcija dodaj_clana je pokrenuta')
    event.preventDefault()

    id=document.getElementById('idd').value
    ime_prezime=document.getElementById('ime_prezime').value
    godina_rodjenja=document.getElementById('godina_rodjenja').value
    email=document.getElementById("email").value
    vrsta_clana=document.querySelector('input[name="vrsta_clana"]:checked').value
    clanarina=3000

    if(vrsta_clana=='povlasceni')
    {
        clanarina-=clanarina*0.2
    }
    
    var popunjavanje_greska=document.getElementById('popunjavanje_greska')
    if(id=='' ||  ime_prezime=='' || godina_rodjenja=='' || email=='' || vrsta_clana=='')
    {
        popunjavanje_greska.classList.add('vidljivo')
        return
    }
    else{
        popunjavanje_greska.classList.remove('vidljivo')
    }

    var id_greska=document.getElementById('id_greska')
    if(validacija_id(id)!=true)
    {
        id_greska.classList.add('vidljivo')
        return
    }
    else
    {
        id_greska.classList.remove('vidljivo')
    }

    var ime_prezime_greska=document.getElementById('ime_prezime_greska')
    if(validacija_ime_prezime(ime_prezime)==false)
    {
        ime_prezime_greska.classList.add('vidljivo')
        return
    }
    else
    {
        ime_prezime_greska.classList.remove('vidljivo')
    }

    var godina_rodjenja_greska=document.getElementById('godina_rodjenja_greska')
    if(validacija_godina_rodjenja(godina_rodjenja)==false)
    {
        godina_rodjenja_greska.classList.add('vidljivo')
        return
    }
    else
    {
        godina_rodjenja_greska.classList.remove('vidljivo')
    }

    var email_greska=document.getElementById('email_greska')
    if(validacija_email(email)==false)
    {
        email_greska.classList.add('vidljivo')
        return
    }
    else
    [
        email_greska.classList.remove('vidljivo')
    ]
    
    // var c=new Clan_teretane(id, ime_prezime, godina_rodjenja, email, vrsta_clana, clanarina)
    // var clanovi=JSON.parse(localStorage.getItem('svi_clanovi'))||[]
    // clanovi.push(c)
    // localStorage.setItem('svi_clanovi',JSON.stringify(clanovi))
    // location.reload()
    
    dugme_za_dodavanje_clana.addEventListener('click', pokreni_interval)
    dugme_za_dodavanje_clana.addEventListener('click', nasumicna_jednacina)
}

function validacija_id(idd)
{
    var clanovi=JSON.parse(localStorage.getItem('svi_clanovi'))||[]
    for (const clan of clanovi) 
    {
        if(clan.id==idd)
        {
            return false
        }
    }
    return true
}
function validacija_ime_prezime(ime_prezime)
{
    for (const karakter of ime_prezime) {
        if(karakter==" ")
        {
            return true
        }
    }
    return false
}
function validacija_godina_rodjenja(godina_rodjenja)
{
    if(godina_rodjenja>=0 && godina_rodjenja<=2023)
    {
        return true
    }
    return false
}
function validacija_email(email)
{
    for (const slovo of email) {
        if(slovo=="@")
        {
            return true
        }
    }
    return false
}

function obrisi(event)
{
    var meta_dogadjaja=event.target
    var pozicija_u_nizu=parseInt(meta_dogadjaja.id.split("_")[1])
    var clanovi=JSON.parse(localStorage.getItem('svi_clanovi'))||[]
    clanovi.splice(pozicija_u_nizu,1)
    localStorage.setItem('svi_clanovi',JSON.stringify(clanovi))
    location.reload()
}

function update_forma(event)
{
    var meta_dogadjaja=event.target
    var pozicija_u_nizu=parseInt(meta_dogadjaja.id.split("_")[1])
    var clanovi=JSON.parse(localStorage.getItem('svi_clanovi'))||[]
    var div_za_update=document.getElementById('update')
    var trenutni_clan=clanovi[pozicija_u_nizu]

    var regularni
    var povlasceni
    if(trenutni_clan.vrsta_clana == "regularni") 
    {
        regularni="checked"
    } 
    else
    {
        povlasceni="checked"
    }

    div_za_update.innerHTML=`
    <form action="" class="forma_za_update">
                    <p>
                        <label for="id">ID:</label>
                        <input type="number" name="id", id="id2" value='${trenutni_clan.id}' readonly>
                    </p>
                    <p>
                        <label for="ime_prezime">Ime i prezime:</label>
                        <input type="text" name="ime_prezime", id="ime_prezime2" value='${trenutni_clan.ime_prezime}'>
                    </p>
                    <p>
                        <label for="godina_rodjenja">Godina rodjenja:</label>
                        <input type="number" name="godina_rodjenja", id="godina_rodjenja2" value='${trenutni_clan.godina_rodjenja}'>
                    </p>
                    <p>
                        <label for="email">Email:</label>
                        <input type="text" name="email", id="email2" value='${trenutni_clan.email}'>
                    </p>
                    <p>
                    Vrsta clana:
                    <label for="vrsta_clana2">Regularni</label>
                    <input type="radio" name="vrsta_clana2" value="regularni" ${regularni}>
                    <label for="vrsta_clana2">Povlasceni</label>
                    <input type="radio" name="vrsta_clana2"  value="povlasceni "${povlasceni}>
                    </p>
                    <p>
                        <button id="update_clana">Posalji formu</button>
                    </p>
                </form>`
    
    var update_clana=document.getElementById('update_clana')
    update_clana.addEventListener('click', azuriraj_clana)

}

function azuriraj_clana(event)
{
    console.log(" funkcija azuriraj_clana je pozvana")
    event.preventDefault()

    id=document.getElementById("id2").value
    ime_prezime=document.getElementById("ime_prezime2").value
    godina_rodjenja=document.getElementById("godina_rodjenja2").value
    email=document.getElementById("email2").value
    vrsta_clana=document.querySelector('input[name="vrsta_clana2"]:checked').value

    if(vrsta_clana=="regularni")
    {
        clanarina=3000
    }
    else
    {
        clanarina=2400
    }
    
    if(id=="" ||  ime_prezime=="" || godina_rodjenja=="" || email=="" || vrsta_clana=="")
    {
        alert("Nisu popunjena sva polja")
        return
    }

    if(validacija_ime_prezime(ime_prezime)==false)
    {
        alert('Ime i prezime mora sadrzati makar dve reci, pokusaj ponovo')
        return
    }
    if(validacija_godina_rodjenja(godina_rodjenja)==false)
    {
        alert('Godina rodjenja ne sme biti veca od 2023. ili negativna, pokusaj ponovo')
        return
    }
    if(validacija_email(email)==false)
    {
        alert('Email mora sadrzati @ u sebi, pokusaj ponovo')
        return
    }
    var c=new Clan_teretane(id, ime_prezime, godina_rodjenja, email, vrsta_clana, clanarina)
    var clanovi=JSON.parse(localStorage.getItem('svi_clanovi'))||[]
    var n=clanovi.length
    for(var i=0; i<n ;i++)
    {
        if(clanovi[i].id==id)
        {
            clanovi[i]=c
            break
        }
    }
    localStorage.setItem('svi_clanovi', JSON.stringify(clanovi))
    location.reload()
}

function pokreni_interval(event)
{
    console.log("funkcija pokreni_interval je pokrenuta")

    event.preventDefault()
    if(interval)
    {
        flag=0
        return
    }
    else
    {
        flag=1
        interval=setInterval(pokreni_timer, 100)//300 puta se izvrsava za 30sec
    }

}

function pokreni_timer()
{
    console.log("funkcija pokreni_timer je pokrenuta")

    var div_za_timer=document.getElementById('div_za_timer')
    div_za_timer.classList.add('vidljivo_flex')

    tajmer=document.getElementById("tajmer")
    trenutna_duzina_tajmera-=0.3333333333333333
    if(trenutna_duzina_tajmera<=0.0000000000000001)
    {
        clearInterval(interval)
        interval==null
        div_za_timer.classList.add('nevidljivo')
        alert("VREME JE ISTEKLO")
        location.reload()
    }
    tajmer.style.width=trenutna_duzina_tajmera+"%"

}

function nasumicna_jednacina()
{
    console.log("funkcija nasumicna_jednacina je pokrenuta")

    var prvi_broj=1+Math.floor(Math.random()*10)
    var drugi_broj=1+Math.floor(Math.random()*10)
    operacije={
        1:"+",
        2:"-",
        3:"*",
        4:"/"
    }

    var operacija=operacije[(1+Math.floor(Math.random()*4))]
    if(operacija=='+')
    {
        tacan_rezultat=prvi_broj+drugi_broj
    }
    else if(operacija=='-')
    {
        tacan_rezultat=prvi_broj-drugi_broj
    }
    else if(operacija=='*')
    {
        tacan_rezultat=prvi_broj*drugi_broj
    }
    else
    {
        tacan_rezultat=Math.floor(prvi_broj/drugi_broj)
    }

    var izracunaj=document.getElementById('izracunaj')
    if(flag==1)
    {
        izracunaj.innerHTML=`
        <form name="forma_za_jednacinu" class="forma_za_jednacinu">
            ${prvi_broj}  ${operacija}  ${drugi_broj}  = 
            <input type="number" name="rezultat" class="rezultat" id="rezultat">
            <input type="submit" value="Potvrdi" id="dugme_za_jednacinu" class="dugme_za_jednacinu">
        </form>`
    }

    var dugme_za_jednacinu=document.getElementById('dugme_za_jednacinu')
    dugme_za_jednacinu.addEventListener('click', proveri_rezultat)
    
}

function proveri_rezultat(event)
{
    console.log('funkcija proveri_rezultat je pokrenuta')
    event.preventDefault()

    var rezultat=document.getElementById('rezultat')
    var rezultat_value=rezultat.value

    if(rezultat_value==tacan_rezultat)
    {
        var c=new Clan_teretane(id, ime_prezime, godina_rodjenja, email, vrsta_clana, clanarina)
        var clanovi=JSON.parse(localStorage.getItem('svi_clanovi'))||[]
        clanovi.push(c)
        localStorage.setItem('svi_clanovi',JSON.stringify(clanovi))
        location.reload()
    }
    else
    {
        var jednacina_greska=document.getElementById('jednacina_greska')
        jednacina_greska.classList.add('vidljivo')
    }
}

