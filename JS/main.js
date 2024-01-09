let clickCount = 0;

function clickBanana() {
    clickCount++;
    document.getElementById('counter').innerText = clickCount;
    checkAchievement();
}


function checkAchievement() {

    if (clickCount === 10) {
        unlockedAchievement (1, `Your first ${clickCount}!`);
    }

    if (clickCount === 25) {
        unlockedAchievement (2, `Your first ${clickCount}!`);
    }

    if (clickCount === 69) {
        unlockedAchievement (3, `Nice`);
    }

    if (clickCount === 100) {
        unlockedAchievement (4, `WOAH ${clickCount}!`);
    }
    
    if (clickCount === 150) {
        unlockedAchievement (5, `Oh nice, ${clickCount}!`);
    }
       
    if (clickCount === 200) {
        unlockedAchievement (6, `Oh nice, ${clickCount}!`);
    }
       
    if (clickCount === 250) {
        unlockedAchievement (7, `Oh nice, ${clickCount}!`);
    }
       
    if (clickCount === 350) {
        unlockedAchievement (8, `Oh my god, ${clickCount}!`);
    }
           
    if (clickCount === 450) {
        unlockedAchievement (9, `Oh my god, ${clickCount}!`);
    }
           
    if (clickCount === 500) {
        unlockedAchievement (10, `You\`re halfway done, ${clickCount}!`);
    }
               
    if (clickCount === 750) {
        unlockedAchievement (11, `You can do it, ${clickCount}!`);
    }
                   
    if (clickCount === 999) {
        unlockedAchievement (12, `ALMOST THERE!!!!!!!!! ${clickCount}`);
    }
                       
    if (clickCount === 1000) {
        unlockedAchievement (13, `Are you perhaps, acoustic? ${clickCount}`);
    }
}

function unlockedAchievement (achievementNumber, message) {

    const achievement = document.getElementById(`achievement-${achievementNumber}`)
    achievement.innerText = message;
}