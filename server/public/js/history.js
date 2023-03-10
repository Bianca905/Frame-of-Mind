window.onload = async () => {
  await generateCalendar();
  // await loadEmoticonCalendar();
  await initEditLog();
  // addEventToEditBtn();
  // changeEmotionDiary()
  // editEmoticon();
  // editDiary()
  // editVoiceMemo()
  //// bottom-nar-bar////
  navigateToHome();
  navigateToCalendar();
  navigateToMood();
  navigateToMentor();
  naviagteToSetting();
  // const diaryEditBtn = document.querySelector(".diary-edit-button");
  // diaryEditBtn.addEventListener("click", async (e) => {
  //   e.preventDefault();
  //   console.log("hi, kenneth");
  //   window.location = "/editDiary.html";
  // });
  //// bottom-nar-bar////

  document.querySelector("main").addEventListener("click", (event) => {
    console.log("main: ", event.target);
  });
};

//// bottom-nar-bar////
function navigateToHome() {
  const voiceDetectionMethod = document.querySelector(".home-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/activities.html";
  });
}
function navigateToCalendar() {
  const voiceDetectionMethod = document.querySelector(".calendar-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/history.html";
  });
}

function navigateToMood() {
  const voiceDetectionMethod = document.querySelector(".mood-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/moodLogSelection.html";
  });
}

function navigateToMentor() {
  const voiceDetectionMethod = document.querySelector(".mentor-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/messageId.html";
  });
}

function naviagteToSetting() {
  const voiceDetectionMethod = document.querySelector(".setting-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/profile.html";
  });
}
//// bottom-nar-bar////

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// V??riavel principal
let date = new Date();

// Fun????o que retorna a data atual do calend??rio
function getCurrentDate(element, asString) {
  if (element) {
    if (asString) {
      return (element.textContent =
        weekdays[date.getDay()] +
        ", " +
        date.getDate() +
        " de " +
        months[date.getMonth()] +
        " de " +
        date.getFullYear());
    }
    return (element.value = date.toISOString().substr(0, 10));
  }
  return date;
}

// Fun????o principal que gera o calend??rio
async function generateCalendar() {
  // Pega um calend??rio e se j?? existir o remove
  const calendar = document.getElementById("calendar");
  if (calendar) {
    calendar.remove();
  }

  // Cria a tabela que ser?? armazenada as datas
  const table = document.createElement("table");
  table.id = "calendar";

  // Cria os headers referentes aos dias da semana
  const trHeader = document.createElement("tr");
  trHeader.className = "weekends";
  weekdays.map((week) => {
    const th = document.createElement("th");
    const w = document.createTextNode(week.substring(0, 3));
    th.appendChild(w);
    trHeader.appendChild(th);
  });

  // Adiciona os headers na tabela
  table.appendChild(trHeader);

  //Pega o dia da semana do primeiro dia do m??s
  const weekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  //Pega o ultimo dia do m??s
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  let tr = document.createElement("tr");
  let td = "";
  let empty = "";
  let btn = document.createElement("button");
  let week = 0;

  // Se o dia da semana do primeiro dia do m??s for maior que 0(primeiro dia da semana);
  while (week < weekDay) {
    td = document.createElement("td");
    empty = document.createTextNode(" ");
    td.appendChild(empty);
    tr.appendChild(td);
    week++;
  }

  // Vai percorrer do 1?? at?? o ultimo dia do m??s
  for (let i = 1; i <= lastDay; ) {
    // Enquanto o dia da semana for < 7, ele vai adicionar colunas na linha da semana
    while (week < 7) {
      td = document.createElement("td");
      let text = document.createTextNode(i);
      btn = document.createElement("button");
      btn.className = "btn-day";
      btn.setAttribute("data-date", i);
      btn.addEventListener("click", function () {
        changeDate(this);
        document.querySelectorAll(".emoji-bar").forEach((item) => {
          item.setAttribute("style", "opacity: 50%");
        });
        // addEventToEditBtn();
      });
      week++;
      td.className = `date-${i}`;
      td.setAttribute("data-date", i);
      // Controle para ele parar exatamente no ultimo dia
      if (i <= lastDay) {
        i++;
        btn.appendChild(text);
        td.appendChild(btn);
      } else {
        text = document.createTextNode(" ");
        td.appendChild(text);
      }
      tr.appendChild(td);
    }
    // Adiciona a linha na tabela
    table.appendChild(tr);

    // Cria uma nova linha para ser usada
    tr = document.createElement("tr");

    // Reseta o contador de dias da semana
    week = 0;
  }
  // Adiciona a tabela a div que ela deve pertencer
  const content = document.getElementById("table");
  content.appendChild(table);
  changeActive();
  changeHeader(date);
  document.querySelectorAll(".btn-day").forEach((btnToday) => {
    // console.log("hello td");
    if (
      btnToday.dataset.date === new Date().getDate().toString() &&
      document.querySelector("#month-header").dataset.year ===
        new Date().getFullYear().toString() &&
      document.querySelector("#month-header").dataset.month ===
        (new Date().getMonth() + 1).toString()
    ) {
      // console.log("hello");
      btnToday.setAttribute("style", "color: #FF0000!important");
    }
  });

  await loadEmoticonCalendar();
  fetchLogOnClick();

  // document.getElementById("date").textContent = date;
  getCurrentDate(document.getElementById("currentDate"), true);
  getCurrentDate(document.getElementById("date"), false);
}

// Altera a data atr??ves do formul??rio
function setDate(form) {
  let newDate = new Date(form.date.value);
  date = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1);
  generateCalendar();
  return false;
}

// M??todo Muda o m??s e o ano do topo do calend??rio
function changeHeader(dateHeader) {
  const month = document.getElementById("month-header");
  month.setAttribute("data-year", dateHeader.getFullYear());
  month.setAttribute("data-month", dateHeader.getMonth() + 1);
  if (month.childNodes[0]) {
    month.removeChild(month.childNodes[0]);
  }
  const headerMonth = document.createElement("h1");
  const textMonth = document.createTextNode(
    months[dateHeader.getMonth()].substring(0, 3) + " " + dateHeader.getFullYear()
  );
  headerMonth.appendChild(textMonth);
  month.appendChild(headerMonth);
}

// Fun????o para mudar a cor do bot??o do dia que est?? ativo
function changeActive() {
  let btnList = document.querySelectorAll("button.active");
  btnList.forEach((btn) => {
    btn.classList.remove("active");
  });
  btnList = document.getElementsByClassName("btn-day");
  for (let i = 0; i < btnList.length; i++) {
    const btn = btnList[i];
    if (btn.textContent === date.getDate().toString()) {
      btn.classList.add("active");
    }
  }
}

// Fun????o que pega a data atual
function resetDate() {
  date = new Date();
  generateCalendar();
}

// Muda a data pelo numero do bot??o clicado
function changeDate(button) {
  let newDay = parseInt(button.textContent);
  date = new Date(date.getFullYear(), date.getMonth(), newDay);
  generateCalendar();
}

// Fun????es de avan??ar e retroceder m??s e dia
function nextMonth() {
  date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  generateCalendar();
}

function prevMonth() {
  date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  generateCalendar();
}

function prevDay() {
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  generateCalendar();
}

function nextDay() {
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  generateCalendar();
}

async function loadEmoticonCalendar() {
  const resp = await fetch("/mood/calendar");

  const result = await resp.json();

  const allMoodLogArr = [];
  // const moodDiaryArr = [];
  // const moodVoiceMemoArr = [];
  // const moodEmoticonArr = [];
  for (const moodDiary of result["allMoodLog"]["moodDiaryArr"]) {
    allMoodLogArr.push({
      emotion: moodDiary["emotion"],
      emoji: moodDiary["emoji"],
      id: { diary: moodDiary["id"] },
      year: new Date(moodDiary["created_at"]).getFullYear(),
      month: new Date(moodDiary["created_at"]).getMonth() + 1,
      day: new Date(moodDiary["created_at"]).getDate(),
    });
  }
  for (const moodVoiceMemo of result["allMoodLog"]["moodVoiceMemoArr"]) {
    allMoodLogArr.push({
      emotion: moodVoiceMemo["emotion"],
      emoji: moodVoiceMemo["emoji"],
      id: { voiceMemo: moodVoiceMemo["id"] },
      year: new Date(moodVoiceMemo["created_at"]).getFullYear(),
      month: new Date(moodVoiceMemo["created_at"]).getMonth() + 1,
      day: new Date(moodVoiceMemo["created_at"]).getDate(),
    });
  }
  for (const moodEmoticon of result["allMoodLog"]["moodEmoticonArr"]) {
    allMoodLogArr.push({
      emotion: moodEmoticon["emotion"],
      emoji: moodEmoticon["emoji"],
      id: { emoticon: moodEmoticon["id"] },
      year: new Date(moodEmoticon["created_at"]).getFullYear(),
      month: new Date(moodEmoticon["created_at"]).getMonth() + 1,
      day: new Date(moodEmoticon["created_at"]).getDate(),
    });
  }

  for (const singleLog of allMoodLogArr) {
    document.querySelectorAll("td").forEach((tdWithDate) => {
      if (
        tdWithDate.dataset.date === singleLog.day.toString() &&
        document.querySelector("#month-header").dataset.year === singleLog.year.toString() &&
        document.querySelector("#month-header").dataset.month === singleLog.month.toString()
      ) {
        const imgTag = document.createElement("img");
        imgTag.setAttribute("src", singleLog.emoji);
        imgTag.className = "emoji";
        if (singleLog.id.diary) {
          imgTag.setAttribute("data-diary", singleLog.id.diary);
        }
        if (singleLog.id.voiceMemo) {
          imgTag.setAttribute("data-voiceMemo", singleLog.id.voiceMemo);
        }
        if (singleLog.id.emoticon) {
          imgTag.setAttribute("data-emoticon", singleLog.id.emoticon);
        }
        tdWithDate.appendChild(imgTag);
      }
    });
  }
}

async function initEditLog() {
  const dateString = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
  const resp = await fetch(`/mood/calendar?date=${dateString}`);
  const logObj = await resp.json();
  console.log(logObj);
  if (JSON.stringify(logObj) === "{}") {
    console.log("hi");
    const mottoBox = document.querySelector(".mottosBox-container");
    mottoBox.hidden = false;
    const diaryEditContainer = document.querySelector(".diary-edit-container");
    diaryEditContainer.hidden = true;
    const emoticonEditContainer = document.querySelector(".emoticon-edit-container");
    emoticonEditContainer.hidden = true;
    const voiceMemoEditContainer = document.querySelector(".voice-memo-edit-container");
    voiceMemoEditContainer.hidden = true;
    const noRecordContainer = document.querySelector(".no-record-container");
    noRecordContainer.hidden = false;

    const resp = await fetch("/mood/mottos");
    const { content } = await resp.json();
    const mottoBoxText = document.querySelector(".mottosBox-text");
    mottoBoxText.innerText = content;
  }
  for (const key in logObj) {
    if (key === "selectedDiary") {
      console.log("selectedDiary");
      const mottoBox = document.querySelector(".mottosBox-container");
      mottoBox.hidden = true;
      const diaryEditContainer = document.querySelector(".diary-edit-container");
      diaryEditContainer.hidden = false;
      const selectedEmoji = document.querySelector(
        `.${logObj[key]["emotion"].toLowerCase()}-emoji`
      );
      selectedEmoji.setAttribute("style", "opacity: 100%");
      const diaryEditBtn = document.querySelector(".diary-edit-button");
      diaryEditBtn.addEventListener("click", async (e) => {
        // e.preventDefault();
        console.log("hi, kenneth its init");
        window.location = `/editDiary.html?date=${dateString}`;
      });
      document.querySelectorAll(".emoji-bar").forEach((selectedEmoji) => {
        selectedEmoji.addEventListener("click", async () => {
          await changeEmotionDiary(dateString, selectedEmoji);
        });
      });
      const emoticonEditContainer = document.querySelector(".emoticon-edit-container");
      emoticonEditContainer.hidden = true;
      const voiceMemoEditContainer = document.querySelector(".voice-memo-edit-container");
      voiceMemoEditContainer.hidden = true;
      const noRecordContainer = document.querySelector(".no-record-container");
      noRecordContainer.hidden = true;
      const resp = await fetch(`/mood/mottos?eid=${logObj[key]["emotion_map_id"]}`);
      const { content } = await resp.json();
      const mottoBoxText = document.querySelector(".mottosBox-text");
      mottoBoxText.innerText = content;
    }
    if (key === "selectedVoiceMemo") {
      console.log("selectedVoiceMemo");
      const mottoBox = document.querySelector(".mottosBox-container");
      mottoBox.hidden = false;
      const diaryEditContainer = document.querySelector(".diary-edit-container");
      diaryEditContainer.hidden = true;
      const emoticonEditContainer = document.querySelector(".emoticon-edit-container");
      emoticonEditContainer.hidden = true;
      const voiceMemoEditContainer = document.querySelector(".voice-memo-edit-container");
      voiceMemoEditContainer.hidden = false;
      const audioController = document.querySelector(".audio-controller");
      audioController.setAttribute("src", logObj[key]["audio_path"]);
      const voiceMemoEditBtn = document.querySelector(".voice-edit-button");
      voiceMemoEditBtn.addEventListener("click", () => {
        window.location = `/selectVoiceRecognition.html?date=${dateString}`;
      });

      const noRecordContainer = document.querySelector(".no-record-container");
      noRecordContainer.hidden = true;
      const resp = await fetch(`/mood/mottos?eid=${logObj[key]["emotion_map_id"]}`);
      const { content } = await resp.json();
      const mottoBoxText = document.querySelector(".mottosBox-text");
      mottoBoxText.innerText = content;
    }
    if (key === "selectedEmoticon") {
      console.log("selectedEmoticon");
      const mottoBox = document.querySelector(".mottosBox-container");
      mottoBox.hidden = false;
      const diaryEditContainer = document.querySelector(".diary-edit-container");
      diaryEditContainer.hidden = true;
      const emoticonEditContainer = document.querySelector(".emoticon-edit-container");
      emoticonEditContainer.hidden = false;
      const emoticonEditBtn = document.querySelector(".emoticon-edit-button");
      emoticonEditBtn.addEventListener("click", () => {
        window.location = `/emoticonMethod.html?date=${dateString}`;
      });
      const voiceMemoEditContainer = document.querySelector(".voice-memo-edit-container");
      voiceMemoEditContainer.hidden = true;
      const noRecordContainer = document.querySelector(".no-record-container");
      noRecordContainer.hidden = true;
      const resp = await fetch(`/mood/mottos?eid=${logObj[key]["emotion_map_id"]}`);
      const { content } = await resp.json();
      const mottoBoxText = document.querySelector(".mottosBox-text");
      mottoBoxText.innerText = content;
    }
  }
}

function fetchLogOnClick() {
  document.querySelectorAll("td").forEach((tdWithDate) => {
    tdWithDate.addEventListener("click", async (e) => {
      const dateString = `${document.querySelector("#month-header").dataset.year}-${
        document.querySelector("#month-header").dataset.month
      }-${tdWithDate.dataset.date}`;
      console.log(dateString);
      const resp = await fetch(`/mood/calendar?date=${dateString}`);
      const logObj = await resp.json();
      console.log(JSON.stringify(logObj));
      if (JSON.stringify(logObj) === "{}") {
        console.log("hi");
        const mottoBox = document.querySelector(".mottosBox-container");
        mottoBox.hidden = false;
        const diaryEditContainer = document.querySelector(".diary-edit-container");
        diaryEditContainer.hidden = true;
        const emoticonEditContainer = document.querySelector(".emoticon-edit-container");
        emoticonEditContainer.hidden = true;
        const voiceMemoEditContainer = document.querySelector(".voice-memo-edit-container");
        voiceMemoEditContainer.hidden = true;
        const noRecordContainer = document.querySelector(".no-record-container");
        noRecordContainer.hidden = false;
        const resp = await fetch("/mood/mottos");
        const { content } = await resp.json();
        const mottoBoxText = document.querySelector(".mottosBox-text");
        mottoBoxText.innerText = content;
      }
      for (const key in logObj) {
        if (key === "selectedDiary") {
          console.log("selectedDiary");
          const mottoBox = document.querySelector(".mottosBox-container");
          mottoBox.hidden = true;
          const diaryEditContainer = document.querySelector(".diary-edit-container");
          diaryEditContainer.hidden = false;
          const selectedEmoji = document.querySelector(
            `.${logObj[key]["emotion"].toLowerCase()}-emoji`
          );
          console.log(logObj[key]["emotion"].toLowerCase());
          selectedEmoji.setAttribute("style", "opacity: 100%");
          const diaryEditBtn = document.querySelector(".diary-edit-button");
          diaryEditBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log("hi, kenneth");
            window.location = `/editDiary.html?date=${dateString}`;
          });

          document.querySelectorAll(".emoji-bar").forEach((emojis) => {
            emojis.addEventListener("click", async (e) => {
              const selectedEmoji = e.target
              eid = parseInt(selectedEmoji.dataset.emoji);
              console.log(eid);
              document.querySelectorAll(".emoji-bar").forEach((emojiNotSelected) => {
                emojiNotSelected.setAttribute("style", "opacity: 50%;");
              });
              selectedEmoji.setAttribute("style", "opacity: 100%;");
              const resp = await fetch(`/method/diary?eid=${eid}&date=${dateString}`);
              // await loadEmoticonCalendar()
              await generateCalendar();
            });
          });
          const emoticonEditContainer = document.querySelector(".emoticon-edit-container");
          emoticonEditContainer.hidden = true;
          const voiceMemoEditContainer = document.querySelector(".voice-memo-edit-container");
          voiceMemoEditContainer.hidden = true;
          const noRecordContainer = document.querySelector(".no-record-container");
          noRecordContainer.hidden = true;
          const resp = await fetch(`/mood/mottos?eid=${logObj[key]["emotion_map_id"]}`);
          const { content } = await resp.json();
          const mottoBoxText = document.querySelector(".mottosBox-text");
          mottoBoxText.innerText = content;
        }
        if (key === "selectedVoiceMemo") {
          console.log("selectedVoiceMemo");
          const mottoBox = document.querySelector(".mottosBox-container");
          mottoBox.hidden = false;
          const diaryEditContainer = document.querySelector(".diary-edit-container");
          diaryEditContainer.hidden = true;
          const emoticonEditContainer = document.querySelector(".emoticon-edit-container");
          emoticonEditContainer.hidden = true;
          const voiceMemoEditContainer = document.querySelector(".voice-memo-edit-container");
          voiceMemoEditContainer.hidden = false;

          const audioController = document.querySelector(".audio-controller");
          audioController.setAttribute("src", logObj[key]["audio_path"]);
          const voiceMemoEditBtn = document.querySelector(".voice-edit-button");
          voiceMemoEditBtn.addEventListener("click", () => {
            window.location = `/selectVoiceRecognition.html?date=${dateString}`;
          });
          const noRecordContainer = document.querySelector(".no-record-container");
          noRecordContainer.hidden = true;
          const resp = await fetch(`/mood/mottos?eid=${logObj[key]["emotion_map_id"]}`);
          const { content } = await resp.json();
          const mottoBoxText = document.querySelector(".mottosBox-text");
          mottoBoxText.innerText = content;
        }
        if (key === "selectedEmoticon") {
          console.log("selectedEmoticon");
          const mottoBox = document.querySelector(".mottosBox-container");
          mottoBox.hidden = false;
          const diaryEditContainer = document.querySelector(".diary-edit-container");
          diaryEditContainer.hidden = true;
          const emoticonEditContainer = document.querySelector(".emoticon-edit-container");
          emoticonEditContainer.hidden = false;
          const emoticonEditBtn = document.querySelector(".emoticon-edit-button");
          emoticonEditBtn.addEventListener("click", () => {
            window.location = `/emoticonMethod.html?date=${dateString}`;
          });
          const voiceMemoEditContainer = document.querySelector(".voice-memo-edit-container");
          voiceMemoEditContainer.hidden = true;
          const noRecordContainer = document.querySelector(".no-record-container");
          noRecordContainer.hidden = true;
          const resp = await fetch(`/mood/mottos?eid=${logObj[key]["emotion_map_id"]}`);
          const { content } = await resp.json();
          const mottoBoxText = document.querySelector(".mottosBox-text");
          mottoBoxText.innerText = content;
        }
      }
    });
  });
}

function addEventToEditBtn() {
  const voiceMemoEditBtn = document.querySelector(".voice-edit-button");
  voiceMemoEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked");
    window.location = `/selectVoiceRecognition.html?date=${dateString}`;
  });
  const emoticonEditBtn = document.querySelector(".emoticon-edit-button");
  emoticonEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location = `/emoticonMethod.html?date=${dateString}`;
  });
  const diaryEditBtn = document.querySelector(".diary-edit-button");
  diaryEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location = `/editDiary.html?date=${dateString}`;
  });
}

changeEmotionDiary = async (dateString, selectedEmoji) => {
  console.log(dateString);
  console.log(selectedEmoji);
  let eid;

  eid = parseInt(selectedEmoji.dataset.emoji);
  console.log(eid);
  document.querySelectorAll(".emoji-bar").forEach((emojiNotSelected) => {
    emojiNotSelected.setAttribute("style", "opacity: 50%;");
  });
  selectedEmoji.setAttribute("style", "opacity: 100%;");
  const resp = await fetch(`/method/diary?eid=${eid}&date=${dateString}`);
  // await loadEmoticonCalendar()
  await generateCalendar();
  selectedEmoji.removeEventListener("click", changeEmotionDiary, dateString, selectedEmoji
  );
}
