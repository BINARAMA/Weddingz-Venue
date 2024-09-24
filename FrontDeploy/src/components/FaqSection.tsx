import React, { useState } from 'react';
import { FaChevronDown, FaTimes } from 'react-icons/fa';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(isOpen);
  };

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center duration-300"
      >
        <p className="font-semibold">{question}</p>
        <div>
          {isOpen ? <FaTimes /> : <FaChevronDown />}
        </div>
      </button>
      {isOpen && (
        <div className="p-40">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection: React.FC = () => {
    const faqs = [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept payments via credit/debit cards, PayPal, and bank transfers.',
        },
        {
          question: 'Can I cancel my booking?',
          answer: 'Yes, you can cancel your booking up to 24 hours before the scheduled event for a full refund.',
        },
      ];

  return (
    <div className="max-w-full mx-auto">
      <h2 className="text-xl font-bold m-4 flex ">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <FAQItem key={faq.answer} question={faq.answer} answer={faq.question} />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
