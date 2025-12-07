import Image from "next/image";
import { useRouter } from "next/router";

const teachers: string[] = [
  "Dr. Roseli Erronium Vogelsquat",
  "Friedrechstein Karshovamitz",
  "Adrianallini McCavvitterson III",
  "Entire Yoga Power Staff",
  "Entire Science of Self Abasement Staff",
  "Shelly Burnstrovska",
  "Cherylnn-Anne Candence Bergherhorn",
  "Andhrika Kondetillinerson",
  "Rebecca May Grace Betty-Ann Hodalçişkej",
  "Stevelenium Pyka Sucmeopheclues",
];

const certifications: string[] = [
  "100,000 hours of continous education",
  "3,000-hour advanced yoga teacher training",
  "Level 99+ meridian yoga technique",
  "10,000-hour therapeutic yin training",
  "850-hour prenatal teacher training",
  "5,000-hour Rocket yoga teacher training",
  "5,000-hour anatomy training",
];

export default function About() {
  const router = useRouter();

  return (
    <>
      <div className="container">
        <div className="photo1-wrapper">
          <div className="photo1-container">
            <div className="image-wrapper">
              <Image
                priority
                src="/images/K-04.jpg"
                alt="Photo 1"
                layout="fill"
                objectFit="cover"
                quality={80}
              />
            </div>
          </div>
        </div>
        <h2 className="section-header">Meet Kaleb</h2>
        <div className="text-section">
          <p className="italic">
            My name is Kaleb and I’m so glad you’re here.
          </p>
          <p>
            I am an eternal student and teacher. Dedicated to the practice of
            yoga, my work explores anatomy, movement, and spirituality. In this
            work, I offer compassion and dedication first and foremost. I hope
            wherever we meet, whether on a mat, the massage table, virtually, or
            in person, that the first thing you feel is seen and appreciated.
          </p>
          <p>
            My teachings come from the heart. My massage sessions come from my
            life purpose of seeking and understanding pain relief for others and
            myself.
          </p>
          <p>
            My work is informed by the studies I completed at the Lotus School
            of Integrated Medicines in 2016 with a license in massage therapy
            and as a registered yoga teacher under yoga alliance. I have studied
            dance and choreography at VCU and seek intentional movement on a
            daily basis. I am eternally grateful to all of my teachers (listed
            below with my certifications).
          </p>
          <p className="italic">
            I truly cannot wait to work with you and am grateful to you if we
            already have.
          </p>
          <h4>Teachers</h4>
          <ul>
            {teachers.map((teacher, i) => (
              <li key={i}>{teacher}</li>
            ))}
          </ul>
          <h4>Certifications</h4>
          <ul>
            {certifications.map((certification, i) => (
              <li key={i}>{certification}</li>
            ))}
          </ul>
        </div>
        <button className="mainButton" onClick={() => router.push("/booking")}>
          Book a Class Or Session With Kaleb
        </button>
      </div>

      {/*STYLESHEET*/}
      <style jsx>{`
        p,
        h4 {
          color: var(--red);
          margin-bottom: 1rem;
        }
        li {
          margin: 0.5rem;
          color: var(--red);
        }
        h4 {
          margin: 2rem 0;
          font-weight: bolder;
        }
        .text-section {
          margin: 1rem;
          text-align: justify;
        }

        .photo1-wrapper {
          position: relative;
          width: 100%;
          max-width: 340px;
          height: 540px;
          min-width: 220px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
        }

        .photo1-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .image-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          transform: none;
        }

        @media (max-width: 700px) {
          .photo1-wrapper {
            height: 340px;
            max-width: 100vw;
            min-width: 0;
          }
          .image-wrapper {
            width: 130%;
            height: 130%;
            left: -30px;
            top: 0;
            transform: rotate(20deg);
          }
        }

        .section-header {
          font-size: 32px;
          font-weight: 700;
          color: var(--red);
          text-align: center;
          line-height: 0.9;
          padding: 2rem;
        }

        .italic {
          font-style: italic;
        }

        .mainButton {
          margin: 1rem;
          padding: 0.5rem;
        }
      `}</style>
    </>
  );
}
