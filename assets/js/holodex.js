// ┬ ┬┌─┐┬  ┌─┐┌┬┐┌─┐─┐ ┬
// ├─┤│ ││  │ │ ││├┤ ┌┴┬┘
// ┴ ┴└─┘┴─┘└─┘─┴┘└─┘┴ └─
// Holodex integration made by WhirrFox

const getLivestreams = async () => {
    const req = new Request('https://holodex.net/api/v2/live?org=Hololive', { headers: { 'X-APIKEY': CONFIG.holodexKey } });

    const response = await fetch(req);
    const data = await response.json();

    return data;
}

const getLivestreamTime = (d) => {
    const f = (i) => {
        if (i < 10) {
            return '0' + i;
        }
        return i;
    }

    return f(d.getHours()) + ':' + f(d.getMinutes());
}

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const generateHolodexList = async () => {
    const listContainer = document.getElementById('holodex');
    if (listContainer) {
        const streams = await getLivestreams();

        for (const s of streams) {
            const d = new Date(s.start_scheduled);
            if (d > tomorrow) {
                continue;
            }

            let title = getLivestreamTime(d) + ' ' + s.channel.english_name + ': ' + (s.topic_id ?? s.title);

                listContainer.innerHTML += `
      <a target="${CONFIG.openInNewTab ? '_blank' : ''}"
      href="${'https://youtu.be/' + s.id}"
      class="listItem holodex-${s.status}"
      title="${s.title}"
      >${title}</a>
    `;
        }
    }
}

generateHolodexList();
