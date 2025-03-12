import Head from "next/head";
import Image from "next/legacy/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Kaleb Clark Yoga" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="index-container">
        <div className="lg-row">
          <div className="photo1-wrapper photolg-wrapper">
            <div className="photo1-container top-photo">
              <Image
                priority
                src="/images/K-17.jpg"
                alt="Photo 1"
                layout="fill"
                objectFit="scale-down"
                quality={80}
              />
            </div>
          </div>
          <div className="photo1-wrapper photolg-wrapper">
            <div className="photo1-container top-photo">
              <Image
                src="/images/K-19.jpg"
                alt="Photo 1"
                layout="fill"
                objectFit="scale-down"
                quality={80}
              />
            </div>
          </div>
        </div>
        <div className="lg-row">
          <div className="text-section top-text-section">
            <h3>Meridian Yoga therapy + Bodywork +</h3>
            <p>
              Katharsis can be described as release of strong emotions to
              achieve a state of renewal and restoration. By processing our
              feelings and emotions and acknowledging the connection they have
              to our mental, spiritual and physical well being we can begin to
              heal ourselves from the root.
            </p>
            <p>
              Our purpose is to provide a clear pathway to an embodied practice
              that is genuinely designed for each individual to support and aid
              in their body{`'`}s innate wisdom to heal.
            </p>
            <p>
              While offering services and products to further enhance the
              healing experience through the use of meridian yoga therapy, Thai
              yoga massage, (self)acupressure, cupping, ayurvedic self care
              rituals & products, and crystal healing. We strongly believe the
              most powerful healing weapon is YOU.
            </p>
            <p className="quote">
              “(Wo)Man is God afraid, (wo)man can only relinquish fear by
              walking up to what he/she is afraid of.” <br />
              <span className="quote-author">-Florence Scovel Shinn</span>
            </p>
          </div>
        </div>
        <div className="lg-row">
          <div className="photo-oval-wrapper">
            <div className="photo-oval-container">
              <div className="photo1-container rotate">
                <Image
                  src="/images/K-34.jpg"
                  alt="Photo 3"
                  layout="fill"
                  objectFit="cover"
                  quality={80}
                />
              </div>
            </div>
          </div>
          <div className="text-section">
            <h3>
              Meridian yoga therapy <br />+ Class schedule
            </h3>
            <p>
              Meridian Yoga is a therapeutic method of meditative movements and
              postures that fuse the eastern sciences of Yoga and TCM to foster
              a deep awareness of the energies that inhabit our bodies and the
              spaces they occupy, often causing us to feel and associate with
              certain emotions that can be destructive over a long period of
              time
            </p>
            <button className="mainButton">VIEW SCHEDULE</button>
          </div>
        </div>
        <div className="lg-row">
          <div className="text-section">
            <h3>BodyWork + thai yoga massage + accup + cupping</h3>
            <p>
              <b>Thai Yoga</b> massage is a synthesis of yoga, Ayurveda, and
              meditation. In receiving a Thai yoga massage, one is passively
              receiving the benefits of the practice of Yoga. This technique can
              be described as assisted Hatha yoga. Thai yoga massage
              incorporates martial arts moves, rhythmic motion, palming, and
              thumbing along energy lines of the recipient by the practitioner.
              Along with gentle stretching and breathwork.
            </p>
            <p>
              Thai Yoga massage improves circulation, relieves muscular tension
              and spasms, helps expedite metabolism, boosts the immune system,
              and balances the body energetically, inducing a calm mental state.
              The origins of this art can be traced back 2,500 years to India
              and the spread of Buddhism. The founding father of Thai Yoga
              massage was Jivaka Kumarbhaccha. A celebrated yogi and doctor.
            </p>
            <p>
              <b>Acupressure</b> - The body consists of 12 major meridian
              pathways that form a continuous web-like network along which vital
              energy flows. These structures are invisible to the naked eye but
              travel through our connective tissue. You can think of them as
              “streams or currents” of energy. Along each meridian lie points
              that when stimulated by pressure, stretching, friction, and
              massage can access deeper energy and relieve pain, tension and
              stress. By pressing and exploring along these pathways we can find
              clues and insights to healing the root cause of your discomfort,
              tension and pain.
            </p>
            <p>
              <b>Cupping</b> - When muscles or connective get tense or
              contracted for long periods of time, the blood flow diminishes.
              Cupping Therapy is an ancient technique that uses plastic cups of
              various sizes to suction areas of skin and muscle. Cupping is
              great for overall relaxation and to release muscle tension because
              it moves blood and Qi stagnation. Cupping stretches the tissue up
              away from the body and draws in new fresh blood and fluids to the
              staganted areas, revitalizing the flow of energy and nutrients.
            </p>
          </div>
          <div className="photo-oval-wrapper">
            <div className="photo-oval-container">
              <div className="photo1-container image-mirror rotate">
                <Image
                  priority
                  src="/images/K-30.jpg"
                  alt="Photo 3"
                  layout="fill"
                  objectFit="cover"
                  quality={80}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="user-testimony-section">
          <h3>Kind words from past clients and students</h3>
          <div className="testimony">
            <p className="testbody">{`"Kaleb’s yoga classes and bodywork have been truly life-changing. His deep understanding of both yoga and massage therapy creates a holistic experience that goes beyond just movement—it’s about healing from the inside out. His presence is grounding, and he tailors each session to what your body truly needs. After just a few sessions, I noticed a significant improvement in my flexibility, posture, and overall well-being. His Meridian Yoga approach has helped me release years of tension I didn’t even realize I was carrying. Whether you're looking for deep tissue relief or a mindful yoga practice, Kaleb’s expertise will leave you feeling lighter, stronger, and more in tune with your body. I can’t recommend him enough!"`}</p>
            <p className="testauth">-Sarah M.</p>
          </div>
          <div className="testimony">
            <p className="testbody">{`"I’ve had many yoga teachers and massage therapists over the years, but Kaleb is truly one of a kind. His ability to read the body and provide exactly what it needs is unparalleled. His yoga classes are accessible yet deeply powerful, helping me move with more awareness and ease. His massage work is just as intuitive—he knows exactly where to apply pressure, how to release tension, and leaves you feeling completely renewed. After each session, I feel like I’ve shed layers of stress, both physically and emotionally. If you’re looking for someone who blends strength, precision, and deep care into their practice, Kaleb is your guy!"`}</p>
            <p className="testauth">-James R.</p>
          </div>
          <div className="testimony">
            <p className="testbody">{`"Kaleb is more than just a yoga instructor or a massage therapist—he’s a true healer. From the first class I took with him, I felt an immediate sense of ease and belonging. He has a gift for making yoga feel approachable, no matter your level, and his hands-on adjustments are incredibly helpful. When I started getting massages with him, I realized just how much my body had been holding onto. His techniques, particularly his knowledge of meridian points, have helped me with chronic pain in ways no one else has. Every session is tailored, intentional, and leaves me feeling physically and mentally recharged. He is someone who truly cares about his clients, and that makes all the difference!"`}</p>
            <p className="testauth">-Emily S.</p>
          </div>
        </div>
      </div>

      {/* STYLESHEET */}
      <style jsx>{`
        .index-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          margin: auto;
          max-width: 100vw;
        }
        .photo1-wrapper {
          padding: 1rem;
        }
        .photo1-container {
          position: relative;
          width: 100%;
          height: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          min-width: 300px;
        }
        .squircle-image-container {
          height: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          min-width: 300px;
        }
        .photo-oval-wrapper .photo-squircle-wrapper {
          margin-top: 2rem;
          padding: 1rem;
        }

        .photo-oval-container {
          position: relative;
          width: 100%;
          height: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          clip-path: ellipse(50% 50% at center);
          transform: rotate(20deg);
        }

        .image-container {
          position: absolute;
          width: 120%;
          height: 100%;
          transform: rotate(-20deg);
          transform: translate(-5%, 0%);
          min-width: 300px;
        }
        .rotate {
          transform: scale(1.2) rotate(-10deg);
        }
        .top-text-section {
          margin: auto;
          min-width: 60%;
          padding: 3rem 0;
        }
        .quote {
          font-size: 17px;
          color: purple;
          font-weight: bold;
          align-self: center;
          margin: auto;
        }
        .quote-author {
          float: right;
          padding: 0.5rem 5rem;
          text-align: center;
          width: 100%;
        }
        .text-section {
          margin-top: 2rem;
          overflow: wrap;
        }
        .text-section h3 {
          font-size: 42px;
          font-weight: 700;
          color: var(--blues);
          text-align: center;
          line-height: 0.9;
          max-width: 100%;
        }
        .text-section p {
          margin: 2rem 1rem;
          text-align: justify;
        }
        .text-section button {
          margin: 1rem;
        }
        .squircle-container {
          position: relative;
          /* transform: scale(0.8); */
          width: 100%; /* Allow it to be responsive */
          max-width: 400px; /* Ensure it doesn’t stretch beyond this */
          max-height: 400px;
          clip-path: path(
            "M 0 200 
     C 0 23 23 0 200 0 
       377 0 400 23 400 200 
       400 377 377 400 200 400 
       23 400 0 377 0 200"
          );
        }

        .squircle-image-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .user-testimony-section {
          margin: 0rem 1rem;
        }
        .user-testimony-section h3 {
          font-size: 38px;
          width: 80%;
          font-weight: 700;
          color: var(--blues);
          text-align: left;
          line-height: 0.9;
          margin-bottom: 3rem;
        }
        .testbody {
          margin: 3rem 0rem;
        }
        .testauth {
          font-size: 18px;
          font-weight: 400;
          color: var(--blues);
          text-align: right;
        }
        .line {
          width: 100%;
          height: 1px;
          background: var(--blues);
          margin: 4rem 0;
        }
        .border {
          border: 1px red solid;
        }

        // MEDIA QUERIES for mid-size screens

        @media (min-width: 600px) {
          .index-container {
            padding: 2rem;
          }
          .lg-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 5rem;
          }
          .photolg-wrapper {
            width: 45%;
            margin: auto;
          }
          .photo1-container {
            height: 600px;
          }
          .photo-oval-wrapper {
            scale: 1.2;
            margin: auto;
          }
          .photo-oval-container {
            height: 600px;
          }
          .text-section {
            width: 50%;
          }
          .text-section h3 {
            font-size: 48px;
          }
          .squircle-container {
            margin: auto;
          }

          .squircle-image-container {
            width: 500px;
            height: 500px;
          }
          .user-testimony-section h3 {
            font-size: 42px;
          }
        }

        // MEDIA QUERIES for desktop

        @media (min-width: 900px) {
          .index-container {
            padding: 2rem;
          }
          .lg-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 5rem;
          }
          .photolg-wrapper {
            width: 45%;
            margin: auto;
          }
          .photo1-container {
            height: 600px;
          }
          .photo-oval-wrapper {
            scale: 1.2;
            margin: auto;
          }
          .photo-oval-container {
            height: 600px;
          }
          .text-section {
            width: 50%;
          }
          .text-section h3 {
            font-size: 48px;
          }
          .squircle-container {
            margin: auto;
            transform: scale(1.2);
          }

          .squircle-image-container {
            width: 500px;
            height: 500px;
          }
          .user-testimony-section h3 {
            font-size: 42px;
          }
        }
      `}</style>
    </>
  );
}
