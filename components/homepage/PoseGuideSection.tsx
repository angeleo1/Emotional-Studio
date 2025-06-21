import Link from 'next/link';

const PoseGuideSection = () => (
  <section className="w-full h-screen relative bg-black flex items-center justify-center">
    <video
      className="w-full h-full object-cover"
      style={{ objectPosition: 'bottom' }}
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/videos/main2.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <Link href="/pose-guide"
      className="glitch-wrapper"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '40vh',
        borderRadius: '2.5rem',
        background: '#fff',
        mixBlendMode: 'difference',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 5vw',
        overflow: 'hidden',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      <span
        className="glitch"
        data-text="POSE"
        style={{
          fontSize: '3.5rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1em',
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          color: 'black'
        }}
      >
        POSE
      </span>
      <span
        className="glitch"
        data-text="GUIDE"
        style={{
          fontSize: '3.5rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1em',
          marginLeft: '1em',
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          color: 'black'
        }}
      >
        GUIDE
      </span>
    </Link>
  </section>
);

export default PoseGuideSection;
