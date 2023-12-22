import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Spinner() {
  let [loading, setLoading] = useState(true);

  return (
    <div className="sweet-loading">
      <ClipLoader
        color={'#0000FF'}
        loading={loading}
        cssOverride={CSSProperties}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;