import { Branch, Flourish } from "./Ornaments";
import { Reveal } from "./Reveal";

export function InvitationLetter() {
  return (
    <section className="invitation-letter paper" id="invitation" aria-label="نص الدعوة">
      <Branch className="letter-botanical botanical-left" />
      <Branch className="letter-botanical botanical-right" />
      <div className="letter-content">
        <Reveal><Flourish/></Reveal>
        <div className="invitation-arabic" lang="ar" dir="rtl">
          <Reveal><p>في الحياة، فما لحظات تعدّي… وفما لحظات تبقى محفورة في القلب.</p></Reveal>
          <Reveal><p>ونهار خطوبتنا بالنسبة لينا موش كان مناسبة، هو بداية فصل جديد من حكاية اخترنا نكمّلوها مع بعضنا.</p></Reveal>
          <Reveal><p>نحمدوا ربي على اللي جمع بين قلوبنا، وعلى الخطوة الجديدة اللي باش نبدّاوها مع بعضنا.</p></Reveal>
          <Reveal><p>وأحلى حاجة في الفرحة، إنها تتقسم مع الناس اللي نحبّوهم… على خاطر هكّا حبّيناكم تكونوا معانا، تشاركونا الضحكة، اللمة، وأول خطوة رسمية في حكايتنا.</p></Reveal>
          <Reveal><p className="invitation-emphasis">وجودكم بيناتنا موش مجرد حضور… وجودكم جزء من فرحتنا.</p></Reveal>
        </div>
        <Reveal className="letter-signoff"><p className="arabic-signoff" lang="ar" dir="rtl">عزيز و مريم</p>
        <Flourish />
        <a className="text-link meta arabic-ui" href="#details" lang="ar" dir="rtl">
          تفاصيل المناسبة <span aria-hidden="true">↓</span>
        </a></Reveal>
      </div>
    </section>
  );
}
