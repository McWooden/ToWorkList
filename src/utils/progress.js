function updateProggress(tasks) {
    if (tasks.length === 0) {
        document.getElementById('proggress').style.display = 'none'
    }
    const tugasSelesai = tasks.filter(x => !x.selesai)
    const tugasBelum = tasks.filter(x => x.selesai)
    document.getElementById('valueBar').style.width = Math.round((tugasSelesai.length / tasks.length)*100) + '%'
    document.getElementById('valueBarRed').style.width = Math.round((tugasBelum.length / tasks.length)*100) + '%'
}