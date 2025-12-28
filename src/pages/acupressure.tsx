import Image from "next/legacy/image";

export default function ThaiMassage() {
  return (
    <>
      <div className="lg-row">
        <div className="text-section">
          <h3>BodyWork - acupressure + cupping</h3>
          <p>
            <b>Acupressure</b> - The body consists of 12 major meridian pathways
            that form a continuous web-like network along which vital energy
            flows. These structures are invisible to the naked eye but travel
            through our connective tissue. You can think of them as “streams or
            currents” of energy. Along each meridian lie points that when
            stimulated by pressure, stretching, friction, and massage can access
            deeper energy and relieve pain, tension and stress. By pressing and
            holding, palming and thumbing along these pathways we can stimulate
            these pathways and encourage deep release and relief
          </p>
          <p>
            <b>Cupping</b> - When muscles and connective tissue are tense or
            contracted for long periods of time, the flow of blood, nutrients,
            and energy(qi) diminishes. Cupping Therapy is an ancient technique
            that uses plastic or glass cups of various sizes to create a vacuum
            effect on areas of skin. As the tissue is lifted up away from the
            body fresh blood and fluids are drawn to the stagnated areas,
            revitalizing the flow of nutrients and replenishing qi. Due to its
            therapeutic effects cupping is great for relaxation and reducing
            inflammation
          </p>
        </div>
        <div className="images-section">
          <div>
            <div className="photo-container">
              <Image
                priority
                src="/images/acu3.jpg"
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
                src="/images/acu2.jpg"
                alt="Photo 3"
                layout="fill"
                objectFit="fill"
                quality={80}
              />
            </div>
            <div className="photo2-container">
              <Image
                priority
                src="/images/acu1.jpg"
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
          justify-content: space-between;
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
