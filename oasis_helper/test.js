var hw = document.getElementById('hw');
var ok = 0;
hw.addEventListener('click', function(){
    for (var i = -1; i < 5; ++i) {
        ok = 1;
    }
    if (ok)
        alert("!");
})