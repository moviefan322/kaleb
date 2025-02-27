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
        <div className="photo1-wrapper">
          <div className="photo1-container">
            <Image
              priority
              src="/images/K-34.jpg"
              alt="Photo 1"
              layout="fill"
              objectFit="cover"
              quality={80}
            />

            <div className="content">
              <h1>HOME/PHOTO 1</h1>
            </div>
          </div>
        </div>
        <div className="photo1-wrapper">
          <div className="photo1-container">
            {/* Background Image */}
            <Image
              src="/images/K-01.jpg"
              alt="Photo 1"
              layout="fill"
              objectFit="cover"
              quality={80}
            />

            <div className="content">
              <h1>HOME/PHOTO 2</h1>
            </div>
          </div>
        </div>
        <div className="photo-oval-wrapper">
          <div className="photo-oval-container">
            <div className="image-container">
              <Image
                src="/images/K-19.jpg"
                alt="Photo 3"
                layout="fill"
                objectFit="cover"
                quality={80}
              />
            </div>
            <div className="content">
              <h1>HOME/PHOTO 3</h1>
            </div>
          </div>
        </div>
        <div className="text-section">
          <h3>Meridian Yoga</h3>
          <p>
            Meridian Yoga Is a combination of two ancient healing forms. Chinese
            Medicine and Yoga. The two are very similar especially in their
            holistic approach to living. In a meridian yoga class, we combine
            their therapeutic aspects of internal physical exploration and
            healing. <br /> <br />
            Classes are geared toward every body, beginners welcome! Meridian
            Yoga classes give you an intro to these pathways or meridians of the
            body. These can be used to recognize patterns, go deeper in
            postures, as focus points, or as a guide to feeling and
            understanding the body. We discuss where they are, their physical
            and emotional properties, and how we can heal ourselves through
            movement and awareness.
            <br /> <br /> We also cover acupressure & warm-up techniques that
            could be done every day for overall well-being. These techniques
            that can be done any time on or off the mat. These are all level
            classes with no experience of yoga or Chinese Medicine necessary.
            <br /> <br />I see myself as a student first and teach what I
            believe in and practice.
            <br /> <br />
            Let’s learn and grow together.
          </p>
          <button className="mainButton">VIEW SCHEDULE</button>
        </div>
        <div className="text-section">
          <h3>Massaage + Body Work</h3>
          <p>
            {`My massage practice is the culmination of eight years of experience,
            integrating everything I've learned from working with others. My
            studies in massage equipped me with the tools to bring healing,
            while my exploration of Chinese Medicine provided a scientific
            foundation for what my intuition had always known.`}
            <br />
            <br />
            {`In my practice, I've discovered that the source of pain is not always where it
            initially presents. By understanding the patterns and pathways of
            the body, known as meridians, I can offer clues and a key to healing
            the root cause of pain both distally and directly.`}
            <br />
            <br />
            {`Specializing in
            providing relief for those in pain, I go beyond our sessions by
            offering personalized recommendations for yoga postures and
            acupressure points to work on at home. During our time together, I
            tailor the session to target and explore tensions using the pressure
            that you prefer and your body requests.`}
            <br />
            <br />
            {`In every session, I
            incorporate an essential element: relaxation. I believe it to be a
            key ingredient, providing your body with the time and space to
            initiate its own healing process.`}
          </p>
          <button className="mainButton">VIEW SCHEDULE</button>
        </div>
        <div className="squircle-container">
          <div className="squircle-image-container">
            {/* Background Image */}
            <Image
              src="/images/K-30.jpg"
              alt="Photo 1"
              layout="fill"
              objectFit="cover"
              quality={80}
            />

            <div className="content">
              <h1>HOME/PHOTO 4</h1>
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
        }

        .photo-oval-wrapper {
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
        }
        .content {
          z-index: 1;
          color: white;
          text-align: center;
          background: rgba(0, 0, 0, 0.5);
          padding: 20px;
          border-radius: 8px;
        }
        .text-section {
          margin-top: 2rem;
        }
        .text-section h3 {
          font-size: 42px;
          font-weight: 700;
          color: var(--blues);
          text-align: center;
          line-height: 0.9;
        }
        .text-section p {
          margin: 2rem 1rem;
        }
        .text-section button {
          margin: 1rem;
        }
        .squircle-container {
          position: relative;
          width: 400px;
          height: 400px;
          overflow: hidden;
          clip-path: path(
            "M 0 200 
     C 0 23 23 0 200 0 
       377 0 400 23 400 200 
       400 377 377 400 200 400 
       23 400 0 377 0 200"
          );
          background: var(--bg);
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
      `}</style>
    </>
  );
}
