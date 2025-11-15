import Head from 'next/head';
import Link from 'next/link';

export default function DMCAPage() {
  return (
    <div className="dmca-container">
      <Head>
        <title>DMCA - Capital Root</title>
        <meta name="description" content="Digital Millennium Copyright Act (DMCA) Policy for Capital Root" />
      </Head>

      <style jsx>{`
        .dmca-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
        }

        .dmca-header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 2px solid #e5e5e5;
          padding-bottom: 20px;
        }

        .dmca-header h1 {
          color: #2c5aa0;
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        .dmca-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .dmca-content {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .section {
          margin-bottom: 30px;
        }

        .section h2 {
          color: #2c5aa0;
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 8px;
          margin-bottom: 15px;
          font-size: 1.5rem;
        }

        .section h3 {
          color: #333;
          margin: 20px 0 10px 0;
          font-size: 1.2rem;
        }

        .section p {
          margin-bottom: 15px;
        }

        .section ul {
          margin: 15px 0;
          padding-left: 20px;
        }

        .section li {
          margin-bottom: 8px;
        }

        .contact-info {
          background: #e8f4ff;
          padding: 20px;
          border-radius: 6px;
          border-left: 4px solid #2c5aa0;
          margin: 20px 0;
        }

        .contact-info strong {
          color: #2c5aa0;
        }

        .counter-notice {
          background: #fff8e8;
          padding: 20px;
          border-radius: 6px;
          border-left: 4px solid #ffa500;
          margin: 20px 0;
        }

        .nav-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e5e5;
        }

        .nav-button {
          padding: 12px 24px;
          background: #2c5aa0;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          transition: background 0.3s ease;
        }

        .nav-button:hover {
          background: #1e3d6f;
        }

        .disclaimer {
          background: #fff3f3;
          padding: 15px;
          border-radius: 6px;
          border: 1px solid #ffcccc;
          margin: 20px 0;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .dmca-container {
            padding: 20px 15px;
          }
          
          .dmca-header h1 {
            font-size: 2rem;
          }
          
          .dmca-content {
            padding: 20px;
          }
          
          .nav-buttons {
            flex-direction: column;
            gap: 15px;
          }
          
          .nav-button {
            text-align: center;
          }
        }
      `}</style>

      <div className="dmca-header">
        <h1>DMCA Policy</h1>
        <p>Digital Millennium Copyright Act Compliance</p>
      </div>

      <div className="dmca-content">
        <div className="section">
          <h2>Copyright Infringement Notification</h2>
          <p>
            Capital Root respects the intellectual property rights of others and expects its users to do the same. 
            In accordance with the Digital Millennium Copyright Act of 1998 ("DMCA"), we will respond expeditiously 
            to claims of copyright infringement committed using our service.
          </p>
        </div>

        <div className="section">
          <h2>Filing a DMCA Notice</h2>
          <p>
            If you are a copyright owner, or authorized to act on behalf of one, and believe that your work has 
            been copied in a way that constitutes copyright infringement, please provide our Copyright Agent with 
            a written notification containing the following information:
          </p>
          
          <ul>
            <li>A physical or electronic signature of a person authorized to act on behalf of the copyright owner</li>
            <li>Identification of the copyrighted work claimed to have been infringed</li>
            <li>Identification of the material that is claimed to be infringing and information reasonably sufficient to permit us to locate the material</li>
            <li>Your contact information, including address, telephone number, and email address</li>
            <li>A statement that you have a good faith belief that use of the material is not authorized by the copyright owner</li>
            <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner</li>
          </ul>
        </div>

        <div className="contact-info">
          <h3>Designated Copyright Agent</h3>
          <p><strong>Email:</strong> dmca@capitalroot.vercel.app</p>
          <p><strong>Response Time:</strong> We typically respond to DMCA notices within 2-3 business days</p>
        </div>

        <div className="section">
          <h2>Counter-Notification</h2>
          <p>
            If you believe that your content was removed in error, you may submit a counter-notification. 
            Your counter-notification must include:
          </p>
          
          <ul>
            <li>Your physical or electronic signature</li>
            <li>Identification of the material that has been removed and the location where it appeared</li>
            <li>A statement under penalty of perjury that you have a good faith belief the material was removed by mistake</li>
            <li>Your name, address, and telephone number</li>
            <li>A statement that you consent to the jurisdiction of Federal District Court and will accept service of process from the person who filed the original DMCA notice</li>
          </ul>
        </div>

        <div className="counter-notice">
          <h3>Important Notice</h3>
          <p>
            Knowingly misrepresenting that material is infringing may subject you to liability for damages. 
            Before filing a DMCA notice, please ensure you are the actual copyright holder or authorized to act on their behalf.
          </p>
        </div>

        <div className="disclaimer">
          <p>
            <strong>Legal Disclaimer:</strong> This DMCA policy is provided for informational purposes only and does not constitute legal advice. 
            If you require legal assistance, please consult with a qualified attorney.
          </p>
        </div>

        <div className="nav-buttons">
          <Link href="/" className="nav-button">
            ← Back to Home
          </Link>
          <Link href="/videos" className="nav-button">
            Browse Videos →
          </Link>
        </div>
      </div>
    </div>
  );
}