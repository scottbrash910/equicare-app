// Egyptian Arabic for the Equicare admin app.
// Plain, spoken words — what you would say at the desk, not newspaper Arabic.
// Written to the admin, who is a woman, so verbs are in the feminine.
// Anything not in here is left exactly as it is: rider names, trainer names,
// membership numbers and horse names are data, never translated.
(function () {
  var MAP = {
    // Tabs and chrome
    "Signed up in the app and said they already ride here": "سجلوا في الأبلكيشن وقالوا إنهم بيركبوا هنا",
    "No record with this number or birthday": "مفيش ملف بالرقم ده أو تاريخ الميلاد ده",
    "Not one of ours · free test": "مش من عندنا · اختبار مجاني",
    "rider to link": "راكب محتاج ربط", "riders to link": "ركاب محتاجين ربط",
    "Booked": "محجوزة", "Came": "حضر", "Missed": "مجاش", "Show · ": "اعرضي · ",
    "Free test · Trotting and walking on your own": "اختبار مجاني · هرولة ومشي لوحده",
    "Jan": "يناير", "Feb": "فبراير", "Mar": "مارس", "Apr": "أبريل", "May": "مايو", "Jun": "يونيو",
    "Jul": "يوليو", "Aug": "أغسطس", "Sep": "سبتمبر", "Oct": "أكتوبر", "Nov": "نوفمبر", "Dec": "ديسمبر",
    "riding today": "بيركبوا النهارده", "horses working": "خيول بتشتغل",
    "Sun": "أحد", "Mon": "اتنين", "Tue": "تلات", "Wed": "أربع", "Thu": "خميس", "Fri": "جمعة", "Sat": "سبت",
    "Sunday": "الأحد", "Monday": "الاتنين", "Tuesday": "التلات", "Wednesday": "الأربع", "Thursday": "الخميس", "Friday": "الجمعة", "Saturday": "السبت",
    "Show": "اعرضي", "Hide": "اخفي", "Change": "تغيير", "to": "لـ",
    "booked": "محجوزة", "still to tick": "لسه",
    "Follows Level 2 — same days, same hours, same session. Only the sessions and price below are its own.":
      "بيمشي مع المستوى 2 — نفس الأيام ونفس المواعيد ونفس الحصة. الحصص والسعر تحت بس بتوعه.",
    "Today": "النهارده", "Riders": "الفرسان", "Money": "الفلوس", "Numbers": "الأرقام", "Setup": "الإعدادات",
    "EQUICARE": "إيكيوكير", "Equicare": "إيكيوكير", "EQUICARE GEZIRA": "إيكيوكير الجزيرة",
    "Admin": "الأدمن", "admin": "admin", "Staff sign in": "دخول الإدارة", "Sign in": "دخول", "Sign out": "خروج",
    "User name": "اسم المستخدم", "PIN": "الرقم السري", "Staff PIN": "الرقم السري", "New 4-digit PIN": "رقم سري جديد من 4 أرقام",
    "For Equicare staff only.": "لإدارة إيكيوكير بس.",
    "The PIN you sign in with as": "الرقم السري اللي بتدخلي بيه باسم",
    ". Four digits. Changing it here changes it on every device that signs in from now on.":
      ". أربعة أرقام. لو غيرتيه من هنا، يتغير على كل الأجهزة من دلوقتي ورايح.",

    // Today's list
    "Today's list": "قائمة النهارده", "All done": "كله خلص",
    "Nothing left for today.": "مفيش حاجة فاضلة النهارده.",
    "Nothing left for today — nobody is booked.": "مفيش حاجة فاضلة النهارده — محدش حاجز.",
    "Nothing to do — Equicare is closed today.": "مفيش حاجة — إيكيوكير مقفول النهارده.",
    "Not now": "مش دلوقتي", "Undo": "رجوع",
    "Someone says they paid — confirm the money arrived": "حد بيقول إنه دفع — أكدي إن الفلوس وصلت",
    "Send today's list to the trainers": "ابعتي قائمة النهارده للمدربين",
    "Send the list again": "ابعتي القائمة تاني",
    "— opens WhatsApp with the list ready": "— هيفتح واتساب والقائمة جاهزة",
    "today — opens WhatsApp": "النهارده — هيفتح واتساب",
    "Mark who came": "علّمي مين حضر",
    "from earlier today still open — takes you to them": "من أول النهارده لسه مفتوحة — هتوديك لها",
    "They have done enough lessons — the trainer decides": "خلّصوا دروس تكفي — المدرب هو اللي يقرر",
    "A word before the card runs out": "كلمتين قبل الكارت يخلص",
    "Left as not paid — chase it or clear it": "متسجلة مش مدفوعة — إما تلحقيها أو تقفليها",
    "A message might bring them back": "رسالة يمكن ترجّعهم",
    "Missing details from the paper form": "ناقص بيانات من الورقة",
    "Last month's record is ready": "سجل الشهر اللي فات جاهز",
    "Print it and file it with the club": "اطبعيه وحطيه في ملف النادي",
    "more when you have time": "كمان لما يبقى عندك وقت",
    "Hidden for a week": "مخفي لمدة أسبوع",
    "Illness or injury": "مرض أو إصابة",

    // Promo codes
    "Promo codes": "البروموكود", "+ New code": "+ كود جديد", "No codes yet.": "مفيش أكواد لسه.",
    "Nobody has used it yet.": "محدش استخدمه لسه.", "Delete code": "امسحي الكود", "Take off": "شيليه",
    "Free lesson": "حصة ببلاش", "% off": "% خصم", "Any level": "أي مستوى", "Max uses": "أقصى عدد",
    "Lessons": "حصص", "Create": "اعمليه", "Cancel": "إلغاء", "Code, e.g. GEZIRA26": "الكود، مثلاً GEZIRA26",
    "Take it off": "شيليه", "Delete the code": "امسحي الكود",
    "Their next card will be the normal size and price. They can not use this code again.":
      "الكارت الجاي هيبقى عادي بنفس العدد والسعر، ومش هيقدر يستخدم الكود ده تاني.",
    "Nobody has used it yet. Brochures with this code will stop working.":
      "محدش استخدمه لسه. البروشورات اللي عليها الكود ده هتبطل تشتغل.",
    "Use 4 to 16 letters or numbers.": "اكتبي من 4 لـ 16 حرف أو رقم.",
    "This code already exists.": "الكود ده موجود قبل كده.",
    "Between 1 and 5 lessons.": "من 1 لـ 5 حصص.", "Between 1% and 90%.": "من 1% لـ 90%.",
    "Max uses must be 1 or more, or empty for no limit.": "أقصى عدد لازم يبقى 1 أو أكتر، أو سيبيه فاضي من غير حد.",

    // The day
    "Back to today": "رجوع للنهارده", "Block a time": "اقفلي وقت", "Close the day": "اقفلي اليوم",
    "Close this day": "اقفلي اليوم ده", "Open the day again": "افتحي اليوم تاني", "Keep it open": "سيبيه مفتوح",
    "Club closed": "النادي مقفول", "National holiday": "عطلة رسمية", "Horse resting": "الخيل مرتاح",
    "Closed by Equicare": "مقفول من إيكيوكير", "Nobody booked": "محدش حاجز", "Just added": "لسه مضافة",
    "Done": "تم", "Did not come": "مجاش", "Give the session back": "رجّعي الحصة", "Keep them": "سيبيهم",
    "Move it": "حرّكيها", "Move": "تحريك", "Remove": "شيل", "Remove and move": "شيل وحرّك",
    "Leave it as it is": "سيبيها زي ما هي", "Leave this one out": "سيبي دي بره", "Set date": "حددي التاريخ",
    "Put back as booked": "رجّعيها محجوزة", "Put back to booked": "رجّعيها محجوزة",
    "Only mark who did not come. Tap the button above to close the day for everyone else.":
      "علّمي بس مين مجاش. دوسي الزر اللي فوق تقفلي اليوم لباقي الناس.",
    "A dot means someone is booked.": "النقطة معناها إن حد حاجز.",
    "Nobody can book a blocked time. Times with someone already booked have to be moved or cancelled first.":
      "محدش يقدر يحجز في وقت مقفول. المواعيد اللي فيها حجز لازم تتحرك أو تتلغي الأول.",
    "Repeats every week": "بيتكرر كل أسبوع", "Covers when someone is out": "بيغطي لما حد يغيب",
    "Who takes over": "مين هياخد مكانه", "What happens": "اللي هيحصل", "Why": "السبب",
    "Write the reason": "اكتبي السبب", "Write the reason riders will see": "اكتبي السبب اللي الفرسان هيشوفوه",
    "Write the reason first": "اكتبي السبب الأول", "Pick a date first": "اختاري تاريخ الأول",
    "Pick a real date": "اختاري تاريخ صح", "That date has already passed": "التاريخ ده عدى خلاص",

    // Riders
    "Search name, membership number or phone": "ابحثي بالاسم أو رقم العضوية أو التليفون",
    "Nobody matches that.": "مفيش حد بالمواصفات دي.",
    "Riding now": "بيركبوا حاليا", "Ready for a test": "جاهز للاختبار", "Profile not finished": "الملف مش كامل",
    "Not riding": "مش بيركب", "Set as not riding": "اعمليه مش بيركب", "Set as riding again": "رجّعيه بيركب",
    "Details": "التفاصيل", "Contact": "التواصل", "Contacts": "جهات الاتصال", "Card": "الكارت",
    "Changes": "التغييرات", "Level": "المستوى", "Member": "العضوية", "Sessions": "الحصص",
    "Sessions left": "الحصص الفاضلة", "Ages": "السن", "Ends": "بينتهي", "Starts": "يبدأ",
    "Date of birth": "تاريخ الميلاد", "Membership number": "رقم العضوية", "Last ride": "آخر مرة ركب",
    "Last rode": "آخر مرة ركب", "With Equicare since": "مع إيكيوكير من", "Signed": "موقّع",
    "Lessons at this level": "دروس في المستوى ده", "Lessons in total": "إجمالي الدروس",
    "Add a card by hand": "ضيفي كارت بنفسك", "Replace the card": "غيّري الكارت", "Replace": "تغيير",
    "Replace it": "غيّريه", "Add the sessions": "ضيفي الحصص", "Add": "إضافة",
    "Yes, move up": "أيوه، رفّعيه", "Yes, move down": "أيوه، نزّليه",
    "Downgrades are rare — check with the trainer first. The lesson counter is left as it is; only the level changes.":
      "النزول نادر — اسألي المدرب الأول. عدّاد الدروس بيفضل زي ما هو، المستوى بس اللي بيتغير.",
    "Card removed again": "الكارت اتشال تاني", "Old card back": "الكارت القديم رجع",
    "Extension removed": "التمديد اتشال", "Date change removed": "تغيير التاريخ اتشال",
    "Session taken back": "الحصة اترجعت", "Already at zero": "خلاص على صفر",
    "What riders are saying": "رأي الفرسان", "Clear all comments": "امسحي كل الملاحظات",
    "Clear all comments?": "تمسحي كل الملاحظات؟", "Clear them": "امسحيهم", "Comments cleared": "الملاحظات اتمسحت",
    "Nothing yet. Riders can write a comment at the bottom of their profile screen.":
      "مفيش لسه. الفرسان يقدروا يكتبوا ملاحظة تحت في صفحة حسابهم.",
    "Name, membership number, date of birth, phone and level are enough to start. The rest can be filled in later.":
      "الاسم ورقم العضوية وتاريخ الميلاد والتليفون والمستوى يكفوا للبداية. الباقي يتملي بعدين.",
    "Guardian's mobile · WhatsApp": "موبايل ولي الأمر · واتساب",
    "Numbers only, in the club's format — like 26604/1.": "أرقام بس، بشكل النادي — زي 26604/1.",
    "Membership numbers look like 26604/1": "أرقام العضوية شكلها 26604/1",
    "Date of birth is not a date.": "تاريخ الميلاد مش تاريخ صح.",
    "Rider is under 7 years old.": "الفارس أقل من 7 سنين.",
    "Phone number is missing the first zero.": "رقم التليفون ناقص الصفر الأول.",

    // Money
    "Waiting to be checked": "مستنية المراجعة", "Money received": "الفلوس وصلت", "Not yet": "لسه",
    "Not confirmed": "مش مأكدة", "Received": "وصلت", "Remind ↗": "فكّريه ↗", "Check in ↗": "اطمني عليه ↗",
    "Ask on WhatsApp": "اسألي على واتساب", "Call": "اتصلي", "WhatsApp": "واتساب",
    "Nothing waiting. All payments are up to date.": "مفيش حاجة مستنية. كل الدفعات تمام.",
    "“Not yet” adds no sessions — it moves them to Not confirmed below, where you can still take the money later.":
      "«لسه» مش بتضيف حصص — بتنقلهم لـ«مش مأكدة» تحت، وتقدري تاخدي الفلوس بعدين.",
    "Cash at the desk — asked in the app": "كاش في المكتب — طلبها من الأبليكيشن",
    "It is a real second payment": "دي فعلا دفعة تانية", "Left as it is": "اتسابت زي ما هي",
    "Left as not paid": "اتسابت مش مدفوعة", "EGP": "جنيه", "Price EGP": "السعر بالجنيه",

    // Numbers + record
    "Riders month by month": "الفرسان شهر بشهر", "This month": "الشهر ده", "Last 6 months": "آخر 6 شهور",
    "Earlier months": "شهور أقدم", "Stopped coming": "بطلوا يجوا", "Cards running out": "كروت قربت تخلص",
    "This month is counted live from the riders list.": "الشهر ده محسوب مباشرة من قائمة الفرسان.",
    "Record for signing ↗": "سجل للتوقيع ↗", "Month record": "سجل الشهر", "Print": "طباعة",
    "Total collected": "إجمالي المحصّل", "Date": "التاريخ", "Rider": "الفارس", "Lvl": "مست",
    "Sess": "حصص", "Trainer": "المدرب", "Trainers": "المدربين",
    "No cards issued in this month.": "مفيش كروت اتعملت الشهر ده.",
    "No extensions or replacements in this month.": "مفيش تمديد ولا تغيير كروت الشهر ده.",
    "No new riders registered in this month.": "مفيش فرسان جداد اتسجلوا الشهر ده.",
    "Every card, extension and replacement above is taken from the app's own log.":
      "كل كارت وتمديد وتغيير فوق مأخوذ من سجل الأبليكيشن نفسه.",
    "Prepared by — name and signature": "إعداد — الاسم والتوقيع",
    "Approved by — name and signature": "موافقة — الاسم والتوقيع",

    // Setup
    "Booking rules": "قواعد الحجز", "Days and hours": "الأيام والمواعيد", "Levels": "المستويات",
    "Horses": "الخيول", "Horses working": "خيول بتشتغل", "Equicare details": "بيانات إيكيوكير",
    "Equicare WhatsApp": "واتساب إيكيوكير", "InstaPay address": "عنوان إنستاباي",
    "Old paper forms": "الورق القديم", "Old rider list": "قائمة الفرسان القديمة",
    "Bring in the old rider list": "هاتي قائمة الفرسان القديمة", "Choose file": "اختاري الملف",
    "Choose your Excel or CSV file": "اختاري ملف الإكسل أو CSV",
    "Rows to check": "صفوف للمراجعة", "Fix this row": "صلّحي الصف ده",
    "All rows checked. Nothing left to fix.": "كل الصفوف اتراجعت. مفيش حاجة فاضلة.",
    "Download every rider's contact": "نزّلي جهات اتصال كل الفرسان",
    "Book ahead (days)": "الحجز مقدما (أيام)", "Cancel window (h)": "مهلة الإلغاء (ساعات)",
    "Card valid (days)": "صلاحية الكارت (أيام)", "Minimum age": "أقل سن",
    "Shared by all three levels": "مشترك بين التلات مستويات",
    "Levels 2 and 3 ride together in one session": "المستوى 2 و3 بيركبوا مع بعض في حصة واحدة",
    "Add a trainer": "ضيفي مدرب", "1 rider at a time": "فارس واحد في المرة",
    "This is your last trainer. Add someone else before removing them.":
      "ده آخر مدرب عندك. ضيفي حد تاني قبل ما تشيليه.",
    "Their riders, their levels and today's sessions all move to this trainer. Nothing is lost.":
      "فرسانه ومستوياته وحصص النهارده كلها هتنتقل للمدرب ده. مش هيضيع حاجة.",
    "These are the same numbers the rider app uses — changing them here changes what riders can do. Same-day bookings are taken until 10 AM with a warning, then the day closes.":
      "دي نفس الأرقام اللي أبليكيشن الفرسان بيستخدمها — لو غيرتيها من هنا هتغير اللي الفرسان يقدروا يعملوه. حجز نفس اليوم مفتوح لحد 10 الصبح مع تنبيه، وبعدها اليوم يقفل.",
    "This text appears on the riders' home screen and in their session list.":
      "الكلام ده بيظهر في الصفحة الرئيسية للفرسان وفي قائمة حصصهم.",
    "Riders get an Open InstaPay button that goes straight to this address.":
      "الفرسان بيشوفوا زر «افتح إنستاباي» بيوديهم للعنوان ده على طول.",
    "Empty for now — riders copy the IBAN and paste it in InstaPay themselves.":
      "فاضي دلوقتي — الفرسان بينسخوا الآيبان ويلزقوه في إنستاباي بنفسهم.",
    "Digits only, without the country code.": "أرقام بس، من غير كود الدولة.",
    "Egyptian numbers are 11 digits starting with 01.": "الأرقام المصرية 11 رقم وبتبدأ بـ 01.",
    "Looks right — the rider app takes this number for its WhatsApp and call buttons.":
      "شكله صح — أبليكيشن الفرسان بياخد الرقم ده لأزرار الواتساب والاتصال.",
    "The PIN must be four digits": "الرقم السري لازم يكون 4 أرقام",
    "PIN changed · use it next time you sign in": "الرقم السري اتغير · استخدميه أول مرة تدخلي",
    "Wrong PIN. Try again.": "الرقم السري غلط. جرّبي تاني.",
    "That user name is not a staff account.": "اسم المستخدم ده مش حساب إدارة.",
    "Could not build the file on this device": "مش قادر يعمل الملف على الجهاز ده",
    "Riders added to the database": "الفرسان اتضافوا لقاعدة البيانات",
    "Horses updated": "الخيول اتحدثت", "Save": "حفظ", "Cancel": "إلغاء", "Open it": "افتحيها",
    "Removed from the list": "اتشال من القائمة", "Back to": "رجوع لـ", "Back to Level": "رجوع للمستوى",
    "Moved back to": "رجع لـ", "Day open again": "اليوم فتح تاني",

    // Small words that stand alone in the interface
    "day": "يوم", "days": "أيام", "session": "حصة", "sessions": "حصص", "rider": "فارس", "riders": "فرسان",
    "left": "فاضل", "unused": "مش مستخدمة", "unfinished": "مش كامل", "riding": "بيركب",
    "comment": "ملاحظة", "comments": "ملاحظات", "need checking": "محتاجة مراجعة", "ready to add": "جاهزة للإضافة",
    "Still needed:": "لسه ناقص:", "Expires": "بينتهي", "Free test ·": "اختبار مجاني ·",
    "Level 2/3": "المستوى 2/3", "Check": "راجعي", "Wish": "اتمني لـ",
    "Nothing booked until": "مفيش حجز لحد", "Equicare is closed on": "إيكيوكير مقفول يوم",
    "Happy birthday,": "عيد ميلاد سعيد،", "a happy birthday": "عيد ميلاد سعيد",
    "›": "‹", "‹": "›"
  };

  // Phrases that carry a number or a name. The captured pieces are put back
  // untouched, so "3 sessions added to Layla's card" keeps both the 3 and Layla.
  var ADAY = { Sunday:"الأحد", Monday:"الاتنين", Tuesday:"التلات", Wednesday:"الأربع", Thursday:"الخميس", Friday:"الجمعة", Saturday:"السبت",
    Sun:"أحد", Mon:"اتنين", Tue:"تلات", Wed:"أربع", Thu:"خميس", Fri:"جمعة", Sat:"سبت" };
  var AMON = { Jan:"يناير", Feb:"فبراير", Mar:"مارس", Apr:"أبريل", May:"مايو", Jun:"يونيو",
    Jul:"يوليو", Aug:"أغسطس", Sep:"سبتمبر", Oct:"أكتوبر", Nov:"نوفمبر", Dec:"ديسمبر",
    January:"يناير", February:"فبراير", March:"مارس", April:"أبريل", June:"يونيو",
    July:"يوليو", August:"أغسطس", September:"سبتمبر", October:"أكتوبر", November:"نوفمبر", December:"ديسمبر" };
  function arDate(s) {
    return s.replace(/\b(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\b/g, function (m) { return ADAY[m] || m; })
            .replace(/\b(January|February|March|April|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, function (m) { return AMON[m] || m; });
  }
  var RULES = [
    [/^Day off — Club closed$/, "يوم راحة — النادي مقفول"],
    [/^Day off — National holiday$/, "يوم راحة — عطلة رسمية"],
    [/^Day off — Horse resting$/, "يوم راحة — الخيل مرتاح"],
    [/^Day off — (.+)$/, "يوم راحة — $1"],
    [/^Everyone else came \((\d+)\)$/, "الباقي كلهم حضروا ($1)"],
    [/^Replacing keeps the sessions they have left and starts a fresh (\d+) days from today\.$/,
      "التغيير بيحفظ الحصص الفاضلة وبيبدأ $1 يوم جديدة من النهارده."],
    [/^Row (\d+)$/, "صف $1"],
    [/^Add (\d+) riders$/, "ضيفي $1 فارس"],
    [/^Close (.+)\?$/, "تقفلي $1؟"],
    [/^Remove (.+)\?$/, "تشيلي $1؟"],
    [/^([\d,]+) EGP$/, "$1 جنيه"],
    // Card-extension requests: the reason is ours to translate, the parent's own
    // note is theirs and is left exactly as written.
    [/^Travel · card ends (.+)$/, "سفر · الكارت بينتهي $1"],
    [/^Illness or injury · card ends (.+)$/, "مرض أو إصابة · الكارت بينتهي $1"],
    [/^Other · card ends (.+)$/, "حاجة تانية · الكارت بينتهي $1"],
    [/^(.+) · card ends (.+)$/, "$1 · الكارت بينتهي $2"],
    [/^Level (\d+)$/, "المستوى $1"],
    [/^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{2}$/, null],
    [/^((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{2}) · (\d+) riding$/, "$1 · $2 بيركبوا"],
    [/^([+-]?\d+) since (.+)$/, "$1 من $2"],
    [/^from (\d+) cards? sold$/, "من $1 كارت اتباع"],
    [/^(\d+) · CARDS ISSUED \((\d+)\)$/, "$1 · الكروت اللي اتعملت ($2)"],
    [/^(\d+) · CARD CHANGES \((\d+)\)$/, "$1 · تغييرات الكروت ($2)"],
    [/^(\d+) · NEW RIDERS \((\d+)\)$/, "$1 · فرسان جداد ($2)"],
    [/^Monthly record — (.+)$/, "سجل شهري — $1"],
    [/^Prepared (.+) · riding centre copy$/, "أُعد في $1 · نسخة المركز"],
    // Dates: the day and month are named in Arabic, the numbers left alone.
    [/^(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday) \d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/, null],
    [/^(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat) \d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/, null],
    [/^\d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(?: \d{4})?$/, null],
    [/^(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)(?:, (?:Sun|Mon|Tue|Wed|Thu|Fri|Sat))+ · .+$/, null],
    [/^(\d+) of (\d+) horses$/, "$1 من $2 خيول"],
    [/^up to (\d+) riders$/, "لحد $1 فرسان"],
    [/^(\d+) riding today$/, "$1 بيركبوا النهارده"],
    [/^\+(\d+) free lessons? · Level (\d+) · (\d+) of (\d+) used$/, "+$1 حصة ببلاش · المستوى $2 · اتستخدم $3 من $4"],
    [/^\+(\d+) free lessons? · Level (\d+) · (\d+) used$/, "+$1 حصة ببلاش · المستوى $2 · اتستخدم $3"],
    [/^\+(\d+) free lessons? · Any level · (\d+) of (\d+) used$/, "+$1 حصة ببلاش · أي مستوى · اتستخدم $2 من $3"],
    [/^\+(\d+) free lessons? · Any level · (\d+) used$/, "+$1 حصة ببلاش · أي مستوى · اتستخدم $2"],
    [/^(\d+)% off · Level (\d+) · (\d+) of (\d+) used$/, "خصم $1% · المستوى $2 · اتستخدم $3 من $4"],
    [/^(\d+)% off · Level (\d+) · (\d+) used$/, "خصم $1% · المستوى $2 · اتستخدم $3"],
    [/^(\d+)% off · Any level · (\d+) of (\d+) used$/, "خصم $1% · أي مستوى · اتستخدم $2 من $3"],
    [/^(\d+)% off · Any level · (\d+) used$/, "خصم $1% · أي مستوى · اتستخدم $2"],
    [/^(.+) · (.+) · added to card$/, "$1 · $2 · اتضافت للكارت"],
    [/^(.+) · (.+) · waiting for card$/, "$1 · $2 · مستنية الكارت"],
    [/^([A-Z0-9]+) · used$/, "$1 · اتستخدم"],
    [/^([A-Z0-9]+) · \+(\d+) free lessons? waiting$/, "$1 · +$2 حصة ببلاش مستنية"],
    [/^([A-Z0-9]+) · (\d+)% off waiting$/, "$1 · خصم $2% مستني"],
    [/^Level (\d+) · (\d+) sessions · ([A-Z0-9]+) \+(\d+) free lessons?$/, "المستوى $1 · $2 حصة · $3 +$4 حصة ببلاش"],
    [/^Level (\d+) · (\d+) sessions · ([A-Z0-9]+) (\d+)% off$/, "المستوى $1 · $2 حصة · $3 خصم $4%"],
    [/^([A-Z0-9]+) is off · it stops working in the app$/, "$1 اتقفل · مش هيشتغل في الأبلكيشن"],
    [/^([A-Z0-9]+) is on · it works in the app now$/, "$1 اشتغل · شغال في الأبلكيشن دلوقتي"],
    [/^([A-Z0-9]+) is ready · it works in the app now$/, "$1 جاهز · شغال في الأبلكيشن دلوقتي"],
    [/^([A-Z0-9]+) deleted$/, "$1 اتمسح"],
    [/^Code taken off (.+)$/, "الكود اتشال من $1"],
    [/^Take ([A-Z0-9]+) off (.+)\?$/, "تشيلي $1 من $2؟"],
    [/^Delete ([A-Z0-9]+)\?$/, "تمسحي $1؟"],
    [/^(\d+) riders? used it\. What they got stays\. Switching it off is usually enough\.$/, "$1 فارس استخدموه. اللي خدوه هيفضل معاهم. كفاية تقفليه."],
    [/^(\d+) horses? working$/, "$1 خيول بتشتغل"],
    [/^(\d+) booked · (\d+) still to tick$/, "$1 محجوزة · $2 لسه"],
    [/^(\d+) booked$/, "$1 محجوزة"],
    [/^Rides together with Level (\d+) — (.+) takes both groups in the same session\.$/,
      "بيركبوا مع المستوى $1 — $2 بياخد المجموعتين في نفس الحصة."],
    [/^Show · (\d+)$/, "اعرضي · $1"],
    [/^(\d+) contacts · each noted “Equicare Gezira rider”$/, "$1 جهة اتصال · كل واحدة مكتوب عليها «فارس إيكيوكير الجزيرة»"],
    [/^(.+) to (\d+:\d+ [AP]M)$/, "$1 لـ$2"],
    [/^(\d+) to do$/, "$1 مطلوب"],
    [/^Check (\d+) payments?$/, "راجعي $1 دفعة"],
    [/^(\d+) riders? — opens WhatsApp with the list ready$/, "$1 فارس — هيفتح واتساب والقائمة جاهزة"],
    [/^(\d+) sessions? from earlier today still open — takes you to them$/, "$1 حصة من أول النهارده لسه مفتوحة — هتوديك لها"],
    [/^Wish (.+) a happy birthday$/, "اتمني عيد ميلاد سعيد لـ$1"],
    [/^Turning (\d+) today — opens WhatsApp$/, "بيكمل $1 سنة النهارده — هيفتح واتساب"],
    [/^(.+) asked for more days$/, "$1 طلب أيام زيادة"],
    [/^(\d+) birthdays today$/, "$1 عيد ميلاد النهارده"],
    [/^(\d+) more when you have time$/, "$1 كمان لما يبقى عندك وقت"],
    [/^(\d+) ready for a test$/, "$1 جاهزين للاختبار"],
    [/^(\d+) nearly out of sessions$/, "$1 حصصهم قربت تخلص"],
    [/^(\d+) payments? not confirmed$/, "$1 دفعة مش مأكدة"],
    [/^(\d+) have not booked in (\d+) days$/, "$1 محجزوش من $2 يوم"],
    [/^(\d+) profiles? unfinished$/, "$1 ملف مش كامل"],
    [/^(\d+) sessions? added$/, "$1 حصة اتضافت"],
    [/^(\d+) sessions? taken off$/, "$1 حصة اتشالت"],
    [/^Back to (\d+) sessions$/, "رجعنا لـ$1 حصة"],
    [/^(\d+) cards? sold$/, "$1 كارت اتباع"],
    [/^(\d+) riders? booked$/, "$1 فارس حاجز"],
    [/^(\d+) riders? (?:are )?riding$/, "$1 فارس بيركب"],
    [/^(\d+) times? blocked$/, "$1 وقت مقفول"],
    [/^(\d+) horses? working$/, "$1 خيول بتشتغل"],
    [/^(\d+) rows? still to check$/, "$1 صف لسه للمراجعة"],
    [/^(\d+) contacts? downloaded$/, "$1 جهة اتصال اتنزلت"],
    [/^(\d+) comments?$/, "$1 ملاحظة"],
    [/^(\d+) sessions? left$/, "$1 حصة فاضلة"],
    [/^(\d+) sessions? left · card ends (.+)$/, "$1 حصة فاضلة · الكارت بينتهي $2"],
    [/^(\d+) lessons? done$/, "$1 درس خلص"],
    [/^(\d+) lessons? at Level (\d+)$/, "$1 درس في المستوى $2"],
    [/^Level (\d+) — (\d+) sessions — (.+) EGP$/, "المستوى $1 — $2 حصة — $3 جنيه"],
    [/^Monthly record — (.+) (\d{4})$/, "سجل شهري — $1 $2"],
    [/^Prepared (.+) · riding centre copy$/, "أُعد في $1 · نسخة المركز"],
    [/^(\d+) · CARDS ISSUED \((\d+)\)$/, "$1 · الكروت اللي اتعملت ($2)"],
    [/^(\d+) · CARD CHANGES \((\d+)\)$/, "$1 · تغييرات الكروت ($2)"],
    [/^(\d+) · NEW RIDERS \((\d+)\)$/, "$1 · فرسان جداد ($2)"],
    [/^Riders on the books at the end of this month: (\d+)$/, "الفرسان المسجلين آخر الشهر ده: $1"],
    [/^(.+) — (\d+) sessions? — (.+) EGP$/, "$1 — $2 حصة — $3 جنيه"],
    [/^Turning (\d+)$/, "بيكمل $1 سنة"],
    [/^(\d+) EGP$/, "$1 جنيه"],
    [/^Last rode (.+)$/, "آخر مرة ركب $1"],
    [/^Signed (.+)$/, "موقّع $1"],
    [/^(.+) · (\d+) (?:month|months)$/, "$1 · $2 شهر"],
    [/^(.+) · (\d+) (?:year|years)$/, "$1 · $2 سنة"]
  ];

  // Every phrase is looked up many times a second, so the answer is remembered.
  // The pattern list only runs on short phrases: long sentences are either an
  // exact entry above or someone's own writing, which we leave alone.
  var CACHE = new Map();
  function resolve(k) {
    if (MAP.hasOwnProperty(k)) return arDate(MAP[k]);
    if (k.length > 130) return null;
    for (var i = 0; i < RULES.length; i++) {
      if (RULES[i][0].test(k)) return arDate(RULES[i][1] === null ? k : k.replace(RULES[i][0], RULES[i][1]));
    }
    return null;
  }
  window.EQ_AR = {
    lookup: function (s) {
      if (!s) return null;
      var k = s.trim();
      if (!k || k.length > 260) return null;
      var hit = CACHE.get(k);
      if (hit === undefined) { hit = resolve(k); CACHE.set(k, hit); }
      if (hit === null) return null;
      var at = s.indexOf(k);
      return s.slice(0, at) + hit + s.slice(at + k.length);
    }
  };
})();
