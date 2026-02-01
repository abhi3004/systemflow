export const SubmitButton = ({ nodes, edges }) => {
    const handleClick = () => {
        console.log('Nodes:', nodes);
        console.log('Edges:', edges);
    };

    return (
        <div className="flex items-center justify-center py-4">
            <button type="submit" onClick={handleClick} className="btn-primary">
                Submit
            </button>
        </div>
    );
}
