# Program 2.0
# Created by Margaret Yu
# for CMS.609, taught by Nick Montfort

import random

dictionary = ['the', 'dog', 'out', 'ear', 'gut', 'not', 'you', 'gel', 'yes', 
			  'tap', 'sad', 'was', 'one', 'our', 'red', 'day', 'get', 'gas',
			  'mat', 'wet', 'eel', 'man', 'new', 'now', 'old', 'see', 'two',
			  'way', 'who', 'toy', 'did', 'rap', 'let', 'put', 'say', 'she',
			  'too', 'use', 'dad', 'mom', 'pet', 'law', 'use', 'dew', 'eat',
			  'lid', 'gym', 'too', 'tag', 'eye', 'ran', 'log', 'mad', 'nap',
			  'odd', 'pal', 'ram', 'saw', 'tan', 'urn', 'wed', 'end', 'yam',
			  'dip', 'yum', 'met', 'nag', 'won', 'sat', 'tow', 'try', 'ups']

class Sequence:
	def __init__(self,num_blocks,num_lines,num_chars_per_line,start_letter):
		self.word_dict = dictionary
		self.num_blocks = num_blocks
		self.num_lines = num_lines
		self.num_chars_per_line = num_chars_per_line
		self.start_letter = start_letter

	def get_random_word(self, word_dict, start_letter):
		valid_words = [word for word in word_dict if word[0] == start_letter]
		return random.choice(valid_words)

	def generate_sequence(self):
		ch_count = 0
		word_len_count = 0
		line_count = 0
		sequence = ''
		while ch_count<self.num_blocks*self.num_lines*self.num_chars_per_line:
			if word_len_count % 3 == 0:
				word = self.get_random_word(self.word_dict, self.start_letter)
				if ch_count == 0:
					word_len_count = 0
				else:
					word_len_count = 1
				self.start_letter = word[-1]
			sequence += word[word_len_count % 3]
			ch_count += 1
			word_len_count += 1
			if ch_count % self.num_chars_per_line == 0:
				line_count += 1
				sequence += '\n'
				if line_count % self.num_lines == 0:
			 		sequence += '\n'
		return sequence[:-2]

sequence = Sequence(5, 17, 25, 'd')
print(sequence.generate_sequence())