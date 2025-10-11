# File: 3_use_custom_model.py
import json

print("Step 3: Using the fine-tuned expert model...")

# --- A student submits new code for the "Two Sum" problem ---
new_student_code = "for i in range(len(nums)): for j in range(len(nums)): if i != j and nums[i] + nums[j] == target: return [i, j]"

print(f"  -> Student submitted code for 'Two Sum':\n     '{new_student_code}'")

# --- We "call" our custom model ---
# We load the receipt to get the model's learned knowledge
with open("tuned_model_receipt.json", "r") as f:
    model_data = json.load(f)
    knowledge_base = model_data['knowledge_base']

# Our model "predicts" by looking up the code in its knowledge base
# This mimics how a real fine-tuned model would respond to a familiar input
expert_feedback = knowledge_base.get(new_student_code, {"error": "Model has not been trained on this specific code."})

print("\n✅ Received expert feedback from the custom model:")
print("-" * 40)
print(f"  Complexity Analysis: {expert_feedback.get('complexity')}")
print(f"  Style/Logic Analysis: {expert_feedback.get('style')}")
print(f"  Suggested Alternative: {expert_feedback.get('alternative')}")
print("-" * 40)