# File: 2_simulate.py
import time
import json

print("Step 2: Simulating the fine-tuning job on the cloud...")

print("  -> Uploading 'training_data.jsonl' to the cloud... Done.")
print("  -> Starting the fine-tuning job... (This would take hours in real life)")

for i in range(5):
    print("  -> Training in progress...")
    time.sleep(0.5)

model_knowledge = {}
with open("training_data.jsonl", "r") as f:
    for line in f:
        data = json.loads(line)
        
        # --- THIS IS THE CORRECTED LINE ---
        # We just need the code string itself, not to load it as JSON.
        key = data['input_text'].split("Code: '")[1].strip("'") 
        
        model_knowledge[key] = json.loads(data['output_text'])

with open("tuned_model_receipt.json", "w") as f:
    receipt = {
        "model_id": "dsa-tutor-model-v1-local-demo",
        "status": "Completed",
        "knowledge_base": model_knowledge
    }
    json.dump(receipt, f, indent=4)

print("✅ Fine-tuning simulation complete! A 'tuned_model_receipt.json' has been created.\n")