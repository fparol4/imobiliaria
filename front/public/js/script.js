(function () {
    //BUTTON QUE ENVIA PARA ADMINISTRAÇÃO
    const admin = document.querySelector('#administracao');
    if (admin)
        admin.onclick = () => window.location.href = admin.getAttribute('data-href');

    const perfil = document.querySelector('#perfil');
        if (perfil)
            perfil.onclick = () => window.location.href = perfil.getAttribute('data-href');

})()

