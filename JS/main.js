let clickCount = 0;

function clickBanana() {
    clickCount++;
    document.getElementById('counter').innerText = clickCount;
    checkAchievement();
}


function checkAchievement() {

    switch (clickCount) {

        case 10:
            unlockedAchievement (1, `Your first ${clickCount}!`);
            break;
            
        case 25:
            unlockedAchievement (2, `Your first ${clickCount}!`);
            break;
            
        case 69:
            unlockedAchievement (3, `Nice`);
            break;
            
        case 100:
            unlockedAchievement (4, `WOAH ${clickCount}!!`);
            break;
            
        case 150:
            unlockedAchievement (5, `Oh nice ${clickCount}!`);
            break;
            
        case 200:
            unlockedAchievement (6, `Oh nice ${clickCount}!`);
            break;
            
        case 250:
            unlockedAchievement (7, `Oh nice ${clickCount}!`);
            break;
            
        case 350:
            unlockedAchievement (8, `Oh my god, ${clickCount}!`);
            break;
            
        case 450:
            unlockedAchievement (9, `Oh my god, ${clickCount}!`);
            break;
            
        case 500:
            unlockedAchievement (10, `You\`re halfway done, ${clickCount}!`);
            break;
            
        case 750:
            unlockedAchievement (11, `You can do it, ${clickCount}!`);
            break;
            
        case 999:
            unlockedAchievement (12, `ALMOST THERE!!!!!!!!! ${clickCount}!`);
            break;
            
        case 1000:
            unlockedAchievement (13, `Are you perhaps, acoustic? ${clickCount}!`);
            break;
    }
}

function unlockedAchievement (achievementNumber, message) {

    const achievement = document.getElementById(`achievement-${achievementNumber}`)
    achievement.innerText = message;
}