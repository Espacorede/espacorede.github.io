const titleText = "Espaçorede";

function triggerAnimation(title, reverse = false) {
    let cycles = 0;
    if (reverse)
        cycles += titleText.length;

    let id = setInterval(() => {
        if ((!reverse && cycles == titleText.length + 2) ||
            (reverse && cycles == -3)) {
            clearInterval(id);
            blinkTitleAnimation(title, !reverse);
            return;
        }
        titleAnimation(cycles, title, reverse);

        if (reverse)
            cycles -= 1;
        else
            cycles += 1;
    }, 50);
}

function titleAnimation(i, element, reverse) {
    element.innerHTML = colorTitleLetter(i, reverse);
}

function colorTitleLetter(i, reverse) {
    if (reverse) {
        switch (i) {
            case titleText.length:
                return `Espaçored<span style="color:#3498db">e</span>`
            case titleText.length - 1:
                return `Espaçore<span style="color:#3498db">d</span><span style="color:#a2a2a2">e</span>`;
            case 0:
                return `<span style="color:#3498db">E</span><span style="color:#a2a2a2">s</span>paçorede`;
            case -1:
                return `<span style="color:#a2a2a2">E</span>spaçorede`;
            case -2:
                return titleText;
            default:
                return titleText.substr(0, i - 1) + 
                    `<span style="color:#3498db">${titleText.charAt(i - 1)}</span>` +
                    `<span style="color:#a2a2a2">${titleText.charAt(i)}</span>` +
                    titleText.substr(i + 1, titleText.length);
        }
    }
    else {
        switch (i) {
            case 0:
                return `<span style="color:#3498db">E</span>` + titleText.substr(1, titleText.length);
            case titleText.length - 1:
                return `Espaçore<span style="color:#a2a2a2">d</span><span style="color:#3498db">e</span>`;
            case titleText.length:
                return `Espaçored<span style="color:#a2a2a2">e</span>`;
            case titleText.length + 1:
                return titleText;
            default:
                return titleText.substr(0, i - 1) + 
                    `<span style="color:#a2a2a2">${titleText.charAt(i - 1)}</span>` +
                    `<span style="color:#3498db">${titleText.charAt(i)}</span>` +
                    titleText.substr(i + 1, titleText.length);
        }
    }
}

function blinkTitleAnimation(title, reverseAnimation) {
    setTimeout(() => {
        blinkTitle(title, true);
    }, 500);


    setTimeout(() => {
        triggerAnimation(title, reverseAnimation);
    }, 10000);
}

function blinkTitle(title, repeat) {
    setTimeout(() => {
        title.style.color = "#3498db";
        setTimeout(() => {
            title.style.color = "#ffe875";
            if (repeat)
                blinkTitle(title, false);
            else {
                setTimeout(() => {
                    title.style.color = "#2b2b2b";
                }, 100);
            }
        }, 100);
    }, 200);
}

window.onload = () => {
    const title = document.getElementById("title");
    triggerAnimation(title);
}