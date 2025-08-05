<script lang="ts">
    let jsonData = '';
    let endpointName = '';
    let message = '';
    let isLoading = false;
    let messageType: 'success' | 'error' = 'success';

    async function uploadJson() {
        if (!jsonData || !endpointName) {
            showMessage('Please provide both endpoint name and JSON data', 'error');
            return;
        }

        try {
            JSON.parse(jsonData); // Validate JSON
        } catch (e) {
            showMessage('Invalid JSON format', 'error');
            return;
        }

        isLoading = true;
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    endpoint: endpointName,
                    data: JSON.parse(jsonData)
                })
            });

            const result = await response.json();

            if (response.ok) {
                showMessage(`Data uploaded successfully! Access at: /api/data/${result.endpoint}`, 'success');
                jsonData = '';
                endpointName = '';
            } else {
                showMessage(result.error || 'Upload failed', 'error');
            }
        } catch (error) {
            showMessage('Error uploading data', 'error');
        }
        isLoading = false;
    }

    function showMessage(text: string, type: 'success' | 'error') {
        message = text;
        messageType = type;
        setTimeout(() => {
            message = '';
        }, 5000);
    }

    function formatJson() {
        try {
            const parsed = JSON.parse(jsonData);
            jsonData = JSON.stringify(parsed, null, 2);
        } catch (e) {
            showMessage('Invalid JSON format', 'error');
        }
    }
</script>

<div class="min-h-screen bg-black text-white p-8">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold mb-8 text-center">JSON Data Upload</h1>
        
        <div class="space-y-6">
            <div>
                <label for="endpoint" class="block text-lg font-medium mb-3">Endpoint Name:</label>
                <input 
                    id="endpoint"
                    type="text" 
                    bind:value={endpointName}
                    placeholder="my-endpoint"
                    class="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white text-lg"
                />
                <p class="text-sm text-gray-400 mt-2">This will be accessible at /api/data/your-endpoint-name</p>
            </div>

            <div>
                <div class="flex justify-between items-center mb-3">
                    <label for="json" class="block text-lg font-medium">JSON Data:</label>
                    <button 
                        on:click={formatJson}
                        class="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Format JSON
                    </button>
                </div>
                <textarea 
                    id="json"
                    bind:value={jsonData}
                    placeholder='Enter your JSON data here...'
                    rows="20"
                    class="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white font-mono text-sm"
                ></textarea>
            </div>

            <button 
                on:click={uploadJson}
                disabled={isLoading}
                class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-4 rounded-lg transition-colors text-lg font-semibold"
            >
                {isLoading ? 'Uploading...' : 'Upload JSON Data'}
            </button>

            {#if message}
                <div class="p-4 rounded-lg {messageType === 'success' ? 'bg-green-900 border border-green-600' : 'bg-red-900 border border-red-600'}">
                    <p class="text-sm">{message}</p>
                </div>
            {/if}
        </div>

        <div class="mt-12 p-6 bg-gray-900 rounded-lg">
            <h2 class="text-xl font-semibold mb-4">How to use:</h2>
            <ol class="list-decimal list-inside space-y-2 text-gray-300">
                <li>Enter a name for your endpoint (e.g., "users", "products")</li>
                <li>Paste your JSON data in the text area</li>
                <li>Click "Upload JSON Data"</li>
                <li>Access your data at: <code class="bg-gray-800 px-2 py-1 rounded">https://yoursite.com/api/data/endpoint-name</code></li>
            </ol>
        </div>
    </div>
</div>