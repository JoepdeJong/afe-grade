$(document).ready(function(){
    $('input').on('change', computePenalty)
})

const computePenalty = () => {
    computePenalty1()
    computePenalty2()
    
}

const computePenalty1 = () => {
    officialDaysLate = 8
    totalLateDays = 0
    penalty = 0
    for(let i = 1; i <= 6; i++) {
        daysLate = parseInt($('#week' + i).val()) || 0

        if(daysLate > 0 && daysLate < 5) {
            usedLateDays = daysLate > officialDaysLate ? officialDaysLate : daysLate
            officialDaysLate = officialDaysLate - usedLateDays
            daysLate = daysLate - usedLateDays
        }

        totalLateDays += daysLate

        console.log(daysLate)
        if(daysLate < 5) {
            penalty += daysLate
        } else {
            penalty += 9
        }
    }

    console.log(totalLateDays, penalty)

    $('#total-days-c1').html(totalLateDays)
    $('#total-penalty-c1').html(penalty)
    $('#average-penalty-c1').html(Math.round(penalty/6*100)/100)
}

const computePenalty2 = () => {
    officialDaysLate = 5
    lateDays = []
    for(let i = 1; i <= 6; i++) {
        lateDays[i-1] = parseInt($('#week' + i).val()) || 0
    }

    while(officialDaysLate > 0) {
        // Get index of max value in lateDays ignoring values larger than 7
        maxIndex = lateDays.indexOf(Math.max(...lateDays.filter(x => x <= 7 && x > 0)))

        // If maxIndex exists
        if(maxIndex > 0) {
            lateDays[maxIndex]--
            officialDaysLate --
        } else {
            break
        }
    }

    console.log(lateDays)
    penalties = []
    for(let i = 1; i <= 6; i++) {
        if(lateDays[i-1] <= 7) {
            penalties[i-1] = Math.min(5, 10*(lateDays[i-1]*lateDays[i-1]/50))
        } else {
            penalties[i-1] = 9
        }
    }

    $('#total-days-c2').html(lateDays.reduce((a, b) => a + b, 0))
    // Compute penalties and round on 2 decimals
    $('#total-penalty-c2').html(Math.round(penalties.reduce((a, b) => a + b, 0)*100)/100    )
    $('#average-penalty-c2').html(Math.round(penalties.reduce((a, b) => a + b, 0)/6*100)/100)
}