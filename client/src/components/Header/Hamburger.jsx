export default function Hamburger({...props}) {
  return (
    <>
      <div className="hamburger" {...props}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </>
  );
}