import Head from "next/head";
import Image from "next/legacy/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kaleb Clark</title>
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
              Katharsis, can be described as the release of emotions to achieve
              a state of renewal and restoration. By processing our feelings and
              acknowledging the connection they have to our overall health and
              well being we can begin to heal ourselves from the root up.
            </p>
            <p>
              Our purpose is to provide a clear pathway to an embodied practice
              that is genuinely designed for each individual to support and aid
              in their body&apos;s innate wisdom to heal.
            </p>
            <p>
              While offering practices and products to further enhance the
              healing experience We strongly believe the most powerful healing
              tool is YOU.
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
              Meridian Yoga is the therapeutic science of meditative breathing,
              postures, yogic practices and philosophy that fuse Yoga and
              Traditional Chinese medicine to foster an awareness of our
              internal experience. Often allowing us to observe and approach
              mental and emotional patterns that can inhibit our evolution over
              a long period of time with a deeper wisdom and clarity.
            </p>
            <button
              className="mainButton"
              onClick={() => {
                window.open(
                  "https://dayayoga.studiogrowth.com/?instructors=466",
                  "_blank"
                );
              }}
            >
              VIEW SCHEDULE
            </button>
          </div>
        </div>
        <div className="lg-row">
          <div className="text-section">
            <h3>BodyWork - thai yoga massage/accupressure & cupping</h3>
            <p>
              <b>Thai Yoga</b> massage is a synthesis of yoga, Ayurveda, and
              meditation. In receiving a Thai yoga massage, one is passively
              receiving the benefits of a deep asana practice. This technique
              can be described as assisted Hatha yoga. Thai yoga massage
              incorporates martial arts movements, rhythmic motion, palming, and
              thumbing along energy channels (sen lines) by the practitioner.
              Along with gentle stretching and breathing.
            </p>
            <p>
              Thai Yoga massage improves circulation, relieves muscular tension
              and spasms. It excels the metabolism, boosts the immune system,
              and balances the bodies energy, inducing a calm mental state and
              relaxed body.
            </p>
            <p>
              <b>Acupressure</b> - The body consists of 12 major meridian
              pathways that form a continuous web-like network along which vital
              energy flows. These structures are invisible to the naked eye but
              travel through our connective tissue. You can think of them as
              “streams or currents” of energy. Along each meridian lie points
              that when stimulated by pressure, stretching, friction, and
              massage can access deeper energy and relieve pain, tension and
              stress. By pressing and holding, palming and thumbing along these
              pathways we can stimulate these pathways and encourage deep
              release and relief
            </p>
            <p>
              <b>Cupping</b> - When muscles and connective tissue are tense or
              contracted for long periods of time, the flow of blood, nutrients,
              and energy(qi) diminishes. Cupping Therapy is an ancient technique
              that uses plastic or glass cups of various sizes to create a
              vacuum effect on areas of skin. As the tissue is lifted up away
              from the body fresh blood and fluids are drawn to the stagnated
              areas, revitalizing the flow of nutrients and replenishing qi. Due
              to its therapeutic effects cupping is great for relaxation and
              reducing inflammation
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
            <div className="speech-bubble">
              <p className="testbody">
                {
                  "Kaleb is an exceptional yoga teacher and masseuse. His thoughtful approach, expert hands-on adjustments, and deep knowledge of yoga create a practice that is both challenging and transformative. As both a teacher and a masseuse, he is a true master of his craft. Every session leaves me feeling stronger, more aligned, and deeply cared for. Highly recommended"
                }
              </p>
            </div>
            <p className="testauth">-Emily S.</p>
          </div>
          <div className="testimony left">
            <div className="speech-bubble">
              <p className="testbody">
                {
                  "I recently had a Thai Yoga massage with Kaleb, and it was wonderful! Kaleb is incredibly skilled, attentive, gentle, but also firm when needed. He listens to needs and responds to things that feel good or less good. The massage left me feeling completely relaxed, stretched, and loose in my body. I highly recommend Kaleb to anyone looking for a restorative and energizing Thai massage :)"
                }
              </p>
            </div>
            <p className="testauth">Esther-</p>
          </div>
          <div className="testimony">
            <div className="speech-bubble">
              <p className="testbody">
                {
                  "I always feel a balance of energized and relaxed after receiving a Thai massage from Kaleb. His in depth understanding of acupressure & the meridian channels coupled with his massage techniques create a well rounded experience. He leads all his sessions with intention & communicates clearly to ensure you’re receiving exactly what your body needs in that moment. Could not recommend more."
                }
              </p>
            </div>
            <p className="testauth">-Jodie</p>
          </div>
          <div className="testimony left">
            <div className="speech-bubble">
              <p className="testbody">
                {
                  "Kaleb's wisdom, emotional and physical attunement, and natural intuition are evident in each class and treatment I experienced with him. As a long-time yoga student, I am drawn to classes and teachers who have the capacity to leave students with new insights into themselves, whether in their bodies or their sense of self. Kaleb is, without a doubt, one of these special teachers. As a student and massage client of his, I find myself learning something new about my practice and abilities through Kaleb’s instruction, class leadership, gentle posture correction and guidance, and his excitement and enthusiasm about yoga and physical care in general. Kaleb is a true inspiration and a unique soul, and I recommend his teaching to anyone who seeks growth and true self-development."
                }
              </p>
            </div>
            <p className="testauth">Edo G.-</p>
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
          margin-right: 0;
          margin-top: 1.5rem;
          position: absolute;
          right: 40px;
          top: 100%;
          white-space: nowrap;
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

        .user-testimony-section .testimony {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-bottom: 4.5rem;
          position: relative;
        }
        .user-testimony-section .testimony.left {
          align-items: flex-start;
        }
        .user-testimony-section .testimony .speech-bubble {
          position: relative;
          background: #ffb6d5;
          color: #333;
          border-radius: 32px 32px 32px 32px/40px 40px 40px 40px;
          padding: 0 2.5rem;
          margin-right: 2.5rem;
          max-width: 600px;
          min-width: 180px;
          font-size: 1.1rem;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
        }
        .user-testimony-section .testimony.left .speech-bubble {
          margin-left: 2.5rem;
          margin-right: 0;
        }
        .user-testimony-section .testimony .speech-bubble:after {
          content: "";
          position: absolute;
          right: 43px;
          bottom: -14px;
          width: 0;
          height: 0;
          border-left: 18px solid transparent;
          border-right: 18px solid transparent;
          border-top: 18px solid #ffb6d5;
        }
        .user-testimony-section .testimony.left .speech-bubble:after {
          left: 43px;
          right: auto;
          bottom: -14px;
        }
        @media (max-width: 700px) {
          .user-testimony-section .testimony .speech-bubble:after {
            right: 23px;
            bottom: -10px;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 12px solid #ffb6d5;
          }
          .user-testimony-section .testimony.left .speech-bubble:after {
            left: 23px;
            right: auto;
            bottom: -10px;
          }
        }
        .user-testimony-section .testimony .testauth {
          font-size: 18px;
          font-weight: 400;
          color: var(--blues);
          text-align: right;
          margin-right: 0;
          margin-top: 1.5rem;
          position: absolute;
          right: 40px;
          top: 100%;
          white-space: nowrap;
        }
        .user-testimony-section .testimony.left .testauth {
          text-align: left;
          left: 40px;
          right: auto;
        }
        @media (max-width: 700px) {
          .user-testimony-section .testimony .testauth {
            right: 12px;
          }
          .user-testimony-section .testimony.left .testauth {
            left: 12px;
            right: auto;
          }
        }
      `}</style>
    </>
  );
}
