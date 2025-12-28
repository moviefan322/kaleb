import Image from "next/legacy/image";

export default function ThaiMassage() {
  return (
    <>
      <div className="lg-row">
        <div className="text-section">
          <h3>BodyWork - thai yoga massage</h3>
          <p>
            <b>Thai Yoga</b> massage is a synthesis of yoga, Ayurveda, and
            meditation. In receiving a Thai yoga massage, one is passively
            receiving the benefits of a deep asana practice. This technique can
            be described as assisted Hatha yoga. Thai yoga massage incorporates
            martial arts movements, rhythmic motion, palming, and thumbing along
            energy channels (sen lines) by the practitioner. Along with gentle
            stretching and breathing.
          </p>
          <p>
            Thai Yoga massage improves circulation, relieves muscular tension
            and spasms. It excels the metabolism, boosts the immune system, and
            balances the bodies energy, inducing a calm mental state and relaxed
            body.
          </p>
        </div>
        <div className="images-section">
          <div>
            <div className="photo-container">
              <Image
                priority
                src="/images/thaimassage3.jpg"
                alt="Photo 3"
                layout="fill"
                objectFit="fill"
                quality={80}
              />
            </div>
          </div>

          <div className="images-row">
            <div className="photo2-container">
              <Image
                priority
                src="/images/thaimassage2.jpg"
                alt="Photo 3"
                layout="fill"
                objectFit="fill"
                quality={80}
              />
            </div>
            <div className="photo2-container">
              <Image
                priority
                src="/images/thaimassage1.jpg"
                alt="Photo 3"
                layout="fill"
                objectFit="fill"
                quality={80}
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .lg-row {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          margin-bottom: 5rem;
          margin-top: 3rem;
        }
        .text-section {
          overflow: wrap;
          width: 50%;
        }
        .text-section h3 {
          font-size: 48px;
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
        .photo-container {
          position: relative;
          width: 614px;
          height: 409px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .photo2-container {
          position: relative;
          width: 300px;
          height: 199px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .images-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 50%;
          align-items: center;
        }
        .images-row {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        @media (max-width: 1200px) {
          .lg-row {
            align-items: center;
          }
          .photo-container {
            width: 450px;
            height: 299px;
          }
          .photo2-container {
            width: 218px;
            height: 145px;
          }
        }
        @media (max-width: 900px) {
          .lg-row {
            flex-direction: column;
            margin-bottom: 2rem;
            align-items: center;
          }
          .text-section,
          .photo-wrapper {
            width: 100%;
          }
          .photo-container {
            height: 253px;
            width: 380px;
          }
          .photo2-container {
            height: 253px;
            width: 380px;
          }
          .images-row {
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
