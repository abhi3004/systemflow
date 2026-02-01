import { useState } from 'react';

export const SubmitButton = ({ nodes, edges }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes.map(n => ({ id: n.id })),
                    edges: edges.map(e => ({ source: e.source, target: e.target })),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const closeAlert = () => setResult(null);

    return (
        <>
            <div className="flex items-center justify-center py-4">
                <button
                    type="submit"
                    onClick={handleClick}
                    className="btn-primary"
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Submit'}
                </button>
            </div>

            {result && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
                    <div className="bg-[var(--bg-color)] rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 border border-[var(--border-color)]">
                        <h2 className="text-xl font-bold mb-4 text-[var(--text-color)]">
                            Pipeline Analysis
                        </h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                <span className="text-[var(--text-color)]">Nodes</span>
                                <span className="font-bold text-blue-600 text-lg">{result.num_nodes}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                                <span className="text-[var(--text-color)]">Edges</span>
                                <span className="font-bold text-purple-600 text-lg">{result.num_edges}</span>
                            </div>
                            <div className={`flex justify-between items-center p-3 rounded-lg ${result.is_dag
                                    ? 'bg-green-50 dark:bg-green-900/30'
                                    : 'bg-red-50 dark:bg-red-900/30'
                                }`}>
                                <span className="text-[var(--text-color)]">Is DAG</span>
                                <span className={`font-bold text-lg ${result.is_dag ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {result.is_dag ? '✓ Yes' : '✗ No'}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={closeAlert}
                            className="btn-primary w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
