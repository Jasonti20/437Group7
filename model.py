import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
import string
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def clean_data(x):
    x = str.lower(x)
    x = x.translate(str.maketrans('', '', string.punctuation))
    return x


def create_soup(x):
    return ''.join(x['keywords']) + ' ' + ''.join(x['top_cast']) + ' ' + ''.join(x['genres'])


def get_recommendations(data,title, cosine_sim,indices):
    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:20]
    movie_indices = [i[0] for i in sim_scores]

    return data['title'].iloc[movie_indices]

def run_model(movie_title):
    data = pd.read_csv('tmdb_movie_info.csv')
    data = data.drop(
        columns=['adult', 'video', 'backdrop_path', 'poster_path', 'Unnamed: 0', 'release_date', 'original_title'])
    features = ['keywords', 'genres', 'top_cast']

    data['overview'] = data['overview'].astype(str)
    for feature in features:
        data[feature] = data[feature].apply(clean_data)

    data['soup'] = data.apply(create_soup, axis=1)

    count = CountVectorizer(stop_words='english')
    count_matrix = count.fit_transform(data['soup'])
    cosine_sim2 = cosine_similarity(count_matrix, count_matrix)

    data = data.reset_index()
    indices = pd.Series(data.index, index=data['title'])

    return get_recommendations(data,movie_title, cosine_sim2, indices)

def main():
    recommendations = run_model("Bullet to the Head")
    print(recommendations)

if __name__ == "__main__":
    main()