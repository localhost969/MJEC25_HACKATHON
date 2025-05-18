import Layout from '../components/Layout';

export default function InterviewPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center p-6 bg-white">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 font-sans">Interview</h1>
        <p className="text-xl font-medium text-gray-700 max-w-2xl leading-relaxed">
          Mock interviews and company questions
        </p>
      </div>
    </Layout>
  );
}
