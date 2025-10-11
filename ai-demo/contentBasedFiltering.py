import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# --- Step 1: Simulate the Data ---

# This simulates your database of questions from Striver's SDE Sheet.
# In a real application, you would load this from a database.
data = {
    'question_id': [f'sde_q_{i}' for i in range(1, 21)],
    'title': [
        'Two Sum', 'Sort Colors', 'Kadane\'s Algorithm', 'Pascal\'s Triangle', 'Next Permutation',
        'Reverse Linked List', 'Middle of Linked List', 'Merge Two Sorted Lists', 'N-ary Tree Preorder Traversal', 'Binary Tree Inorder Traversal',
        'BFS of graph', 'DFS of graph', 'Number of Islands', 'Clone Graph', 'Topological Sort',
        '0/1 Knapsack', 'Longest Common Subsequence', 'Coin Change', 'Edit Distance', 'Word Break'
    ],
    'topic': [
        'Arrays', 'Arrays', 'Arrays', 'Arrays', 'Arrays',
        'LinkedList', 'LinkedList', 'LinkedList', 'Trees', 'Trees',
        'Graphs', 'Graphs', 'Graphs', 'Graphs', 'Graphs',
        'Dynamic Programming', 'Dynamic Programming', 'Dynamic Programming', 'Dynamic Programming', 'Dynamic Programming'
    ],
    'difficulty': [
        'Easy', 'Medium', 'Medium', 'Easy', 'Medium',
        'Easy', 'Easy', 'Easy', 'Easy', 'Easy',
        'Medium', 'Medium', 'Medium', 'Medium', 'Hard',
        'Medium', 'Medium', 'Medium', 'Hard', 'Hard'
    ]
}
questions_df = pd.DataFrame(data)

# Simulate a user's profile after they took a test.
# This user is strong in Arrays/LinkedList, but very weak in Graphs and DP.
user_skill_profile = {
    'Arrays': 0.90,
    'LinkedList': 0.85,
    'Trees': 0.60,
    'Graphs': 0.25,          # Weak area
    'Dynamic Programming': 0.30 # Weak area
}

# Simulate questions the user has already solved. We should not recommend these again.
user_solved_list = ['sde_q_1', 'sde_q_6']


# --- Step 2: Implement the Content-Based Filtering Logic ---

# 2a. Feature Engineering: Create a "content" field for each question.
# This combines the important attributes into a single string.
questions_df['content'] = questions_df['topic'] + ' ' + questions_df['difficulty']

# 2b. Text Analysis (Vectorization): Convert the text content into numerical vectors.
# TF-IDF (Term Frequency-Inverse Document Frequency) is a standard technique for this.
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(questions_df['content'])

# 2c. Create a User Preference Profile based on their weaknesses.
weak_topics = [topic for topic, score in user_skill_profile.items() if score < 0.5]
user_preference_string = " ".join(weak_topics)

# 2d. Vectorize the User's Profile using the same vectorizer.
user_vector = tfidf_vectorizer.transform([user_preference_string])

# 2e. Calculate Similarity: Find how similar the user's needs are to each question.
# Cosine Similarity is a perfect metric for this. It measures the angle between vectors.
cosine_similarities = cosine_similarity(user_vector, tfidf_matrix).flatten()

# 2f. Rank and Recommend: Get the indices of the most similar questions.
top_indices = cosine_similarities.argsort()[::-1]

# Filter out questions the user has already solved.
unsolved_recommendations = []
for idx in top_indices:
    question_id = questions_df.iloc[idx]['question_id']
    if question_id not in user_solved_list:
        unsolved_recommendations.append(questions_df.iloc[idx])

# Get the top 5 recommendations.
final_recommendations_df = pd.DataFrame(unsolved_recommendations).head(5)


# --- Step 3: Display the Results ---

print("✅ User's Skill Profile:")
print(user_skill_profile)
print(f"\n Identified Weak Topics: {', '.join(weak_topics)}")
print("\n" + "="*50 + "\n")
print("🚀 Top 5 Personalized Recommendations:\n")
print(final_recommendations_df[['question_id', 'title', 'topic', 'difficulty']])