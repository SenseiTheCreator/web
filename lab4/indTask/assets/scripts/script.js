function markAsHeld() {
    this.isHeld = true;
    console.log(`Зустріч "${this.name}" відмічена як проведена.`);
}

let meeting = {
    name: "Обговорення проєкту",
    date: "2026-10-06",
    time: "10:00",
    place: "Офіс",
    isHeld: true,
    meetingInfo() {
        console.log(`Тема: ${this.name}, Дата: ${this.date}, Час: ${this.time}, Місце: ${this.place}, Проведена: ${this.isHeld ? "Так" : "Ні"}`);
    }
};

meeting.meetingInfo();

meeting.isHeld = !meeting.isHeld;
meeting.meetingInfo();

let schedule = [
    { name: "Планування спринту", date: "2026-10-01", time: "09:30", place: "Офіс", isHeld: true, markAsHeld },
    { name: "Зустріч з клієнтом", date: "2026-10-10", time: "14:00", place: "Кафе", isHeld: false, markAsHeld },
    { name: "Презентація звіту", date: "2026-10-06", time: "11:00", place: "Конференц-зал", isHeld: true, markAsHeld },
];

function displaySchedule() {
    schedule.forEach(meeting => {
        console.log(`Тема: ${meeting.name}, Дата: ${meeting.date}, Час: ${meeting.time}, Місце: ${meeting.place}, Проведена: ${meeting.isHeld ? "Так" : "Ні"}`);
    });
}

schedule.push({ name: "Співбесіда", date: "2026-10-20", time: "16:00", place: "Онлайн", isHeld: false, markAsHeld });
displaySchedule();

schedule.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
console.log("Розклад після сортування за датою:");
displaySchedule();

let notHeldMeetings = schedule.filter(meeting => !meeting.isHeld);
console.log("Непроведені зустрічі:", notHeldMeetings);

let onlineMeeting = schedule.find(meeting => meeting.place === "Онлайн");
console.log("Онлайн-зустріч:", onlineMeeting);

function addMeetingToSchedule() {
    let name = prompt("Введіть назву зустрічі:");
    let date = prompt("Введіть дату зустрічі (РРРР-ММ-ДД):");
    let time = prompt("Введіть час зустрічі:");
    let place = prompt("Введіть місце зустрічі:");
    let isHeld = confirm("Чи проведена зустріч?");
    schedule.push({ name, date, time, place, isHeld, markAsHeld });
    displaySchedule();
}

addMeetingToSchedule();

schedule.find(meeting => meeting.name === "Зустріч з клієнтом").markAsHeld();
displaySchedule();

function calculateHeldPercentage() {
    let heldCount = 0;
    schedule.forEach(meeting => {
        if (meeting.isHeld) heldCount++;
    });
    return Math.round(heldCount / schedule.length * 100);
}

console.log(`Відсоток проведених зустрічей: ${calculateHeldPercentage()}%`);