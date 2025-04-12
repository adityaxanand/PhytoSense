import Head from 'next/head';

const LinkedinHead = () => {
  return (
    <>
        <script
          src="https://platform.linkedin.com/badges/js/profile.js"
          async
          defer
          type="text/javascript"
        ></script>
        {/* LinkedIn badge code */}
        <div 
        className="badge-base LI-profile-badge" 
        data-locale="en_US" 
        data-size="medium" 
        data-theme="dark" 
        data-type="HORIZONTAL" 
        data-vanity="adityaxanand" 
        data-version="v1"
        >
      </div>
    </>
  );
};

export default LinkedinHead;
