# File: 1_prepare_dataset.py
import json

print("Step 1: Preparing the training dataset...")

# Our small, expert-level dataset with two examples
training_examples = [
    {
        "problem": "Two Sum",
        "student_code": "for i in range(len(nums)): for j in range(len(nums)): if i != j and nums[i] + nums[j] == target: return [i, j]",
        "expert_feedback": {
            "complexity": "O(N^2) - Suboptimal due to a nested loop.",
            "style": "The logic is correct, but this is a brute-force solution.",
            "alternative": "Use a hash map to achieve an optimal O(N) solution."
        }
    },
    {
        "problem": "Reverse a Linked List",
        "student_code": "prev = None\nwhile head.next:\n  temp = head.next\n  head.next = prev\n  prev = head\n  head = temp\nreturn prev",
        "expert_feedback": {
            "complexity": "O(N) - Optimal time complexity.",
            "style": "Logic error: The loop condition 'while head.next' will miss the last node, causing an incomplete reversal.",
            "alternative": "The loop condition should be 'while head' to correctly process the entire list."
        }
    }
]

output_filename = "training_data.jsonl"

with open(output_filename, "w") as f:
    for example in training_examples:
        input_text = f"Problem: '{example['problem']}'. Code: '{example['student_code']}'"
        output_text = json.dumps(example['expert_feedback'])
        
        json_line = {"input_text": input_text, "output_text": output_text}
        f.write(json.dumps(json_line) + "\n")

print(f"✅ Successfully created '{output_filename}' with {len(training_examples)} examples.\n")