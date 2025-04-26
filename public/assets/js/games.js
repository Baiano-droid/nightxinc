document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const contentRequirements = document.querySelector('.content-requirements'); // Referência para content-requirements
    const statsTab = document.querySelector('#stats'); // Referência para a aba de stats
    const statsLink = document.querySelector('[data-tab="stats"]'); // Link da aba de stats

    contentRequirements.classList.add('hidden'); // Iniciar com o conteúdo oculto

    // Apenas adicionar evento de clique nas divs para troca de abas
    const tabDivs = document.querySelectorAll('.navbar-links > div');

    tabDivs.forEach(div => {
        div.addEventListener('click', function() {
            const tabLink = div.querySelector('.tab-link');
            if (tabLink) {
                activateTab(tabLink); // Ativa a aba associada à div clicada
            }
        });
    });

    function activateTab(element) {
        // Remove a classe ativa de todas as abas e painéis
        tabLinks.forEach(link => link.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Adiciona a classe ativa à aba clicada
        element.classList.add('active');

        const tabId = element.getAttribute('data-tab');
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        
        if (tabId === 'support') {
            contentRequirements.classList.remove('hidden');
        } else {
            contentRequirements.classList.add('hidden');
        }

        // Garantir que a aba de stats fique oculta
        if (statsTab) statsTab.classList.add('hidden');
    }
});



function openModal(platform) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modal").dataset.platform = platform;
    document.getElementById("successMessage").style.display = "none";
    document.getElementById("discordError").innerText = "";
    document.getElementById("channelError").innerText = "";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function validateDiscordProfile(profile) {
    return /^(@?[a-zA-Z0-9_]+|[a-zA-Z0-9_]+#[0-9]{4})$/.test(profile); 
}

function validateChannelLink(link, platform) {
    const validLinks = {
        "YouTube": ["https://www.youtube.com/", "https://youtube.com/"],
        "TikTok": ["https://www.tiktok.com/", "https://tiktok.com/"],
        "Twitch": ["https://www.twitch.tv/", "https://twitch.tv/"]
    };

    return validLinks[platform].some(prefix => link.startsWith(prefix));
}

function sendToDiscord() {
    const discordProfile = document.getElementById("discordProfile").value.trim();
    const channelLink = document.getElementById("channelLink").value.trim();
    const platform = document.getElementById("modal").dataset.platform;

    let valid = true;
    document.getElementById("discordError").innerText = "";
    document.getElementById("channelError").innerText = "";

    if (!validateDiscordProfile(discordProfile)) {
        document.getElementById("discordError").innerText = "Invalid Discord profile format. Use '@username', 'User#1234' or 'rafael_net'.";
        valid = false;
    }

    if (!validateChannelLink(channelLink, platform)) {
        document.getElementById("channelError").innerText = `Invalid ${platform} link. Please use a valid URL format.`;
        valid = false;
    }

    if (!valid) {
        return;
    }

    const webhookURL = "https://discord.com/api/webhooks/1333850307783954492/Na1xG4tMnK53gxwP8xC_QtfRIKRViNthSpEGQnQ5jW3BV_xV5L4zh967RTHR8jNVr7_i"; 

    const message = {
        content: `**📢 Novo Pedido de Criador de Conteúdo**\n\n` +
                 `**Plataforma:** ${platform}\n` +
                 `**Discord:** <@${discordProfile}>\n` +
                 `**Canal:** [Link para o Canal](${channelLink})\n\n` +
                 `⏳ *Aguardando aprovação*...`
    };

    document.getElementById("submitButton").disabled = true;
    document.getElementById("submitButton").innerText = "Sending...";

    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("successMessage").style.display = "block";
            document.getElementById("discordProfile").value = "";
            document.getElementById("channelLink").value = "";
        } else {
            alert("Error submitting request.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error submitting request.");
    })
    .finally(() => {
        document.getElementById("submitButton").disabled = false;
        document.getElementById("submitButton").innerText = "Submit";
    });
}