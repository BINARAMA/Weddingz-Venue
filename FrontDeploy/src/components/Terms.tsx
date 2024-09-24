

const TermsAndPolicyCard = () => {
    return (
        <div className="border border-gray-200 rounded p-4">
            <h2 className="text-2xl font-semibold mb-4">Terms and Policies</h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Booking Policy</h3>
                <ol className="list-decimal pl-6">
                    <li className="text-gray-700 mb-2">Pay 40% of the package price to book the package, rest to be paid directly to the vendor on the day of the event.</li>
                </ol>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Cancellation Policy</h3>
                <ol className="list-decimal pl-6">
                    <li className="text-gray-700 mb-2">This booking is non-cancellable. However, the booking can be moved to another date at no extra charge.</li>
                </ol>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Terms</h3>
                <ol className="list-decimal pl-6">
                    <li className="text-gray-700 mb-2">Transportation charges: No transportation charges apply within the city. If the event is outside the city, Travel & Stay charges shall be borne by the client.</li>
                    <li className="text-gray-700 mb-2">Raw Images/Videos dump will not be shared with the client.</li>
                    <li className="text-gray-700 mb-2">A minimum of 6 to 8 weeks will be required to deliver on your selected deliverables (depending upon the wedding season, if there is a slight delay in the time of deliverables, do bear with us. We will sincerely try to deliver on time!)</li>
                    <li className="text-gray-700 mb-2">A 4-hour work day is counted as a half day and an 8-hour work day is counted as a full day. If the brief is extended from the originally quoted time duration, extra hour charges may apply. Rates may vary outside normal working hours.</li>
                    <li className="text-gray-700 mb-2">If any package contains X no. of clicks/shots and in case extra clicks/shots are requested by the client, additional charges will be applicable.</li>
                    <li className="text-gray-700 mb-2">The client is responsible for having an authorized representative present during all shooting phases of the Assignment. If no representative is present, the Photographer's interpretation shall be accepted.</li>
                    <li className="text-gray-700 mb-2">After booking confirmation, if you wish to change/alter your booked services in any way (e.g. your chosen event dates or location), we will do our utmost to accommodate these changes but it may not always be possible. Any request for changes must be in writing from the person who made the booking. All costs incurred due to amendments will be borne by you.</li>
                    <li className="text-gray-700 mb-2">Weddingz.in does not accept any responsibility for third party services or service providers. We guarantee that the photographer will reach at the location on time but we are not responsible for the quality of the deliverables.</li>
                </ol>
            </div>
        </div>
    );
};

export default TermsAndPolicyCard;
