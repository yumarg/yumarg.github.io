# Program 1.5
# Created by Margaret Yu
# for CMS.609, taught by Nick Montfort

from random_words import RandomWords

class Sequence:
	
	def __init__(self, num_lines, num_words_per_line, start_letter):
		self.rw = RandomWords()
		self.num_lines = num_lines
		self.num_words_per_line = num_words_per_line
		self.start_letter = start_letter

	def generate_line(self, start_letter):
		line = ""
		word_count = 0
		rw = self.rw
		starting_letter = start_letter
		while word_count < self.num_words_per_line:
			if word_count == 0:
				word = rw.random_word(starting_letter)
				line += word
				starting_letter = word[-1]
				word_count += 1
			else:
				word = rw.random_word(starting_letter)
				line += word[1:]
				starting_letter = word[-1]
				word_count += 1
		return line

	def generate_sequence(self):
		sequence = ""
		line_count = 0
		while line_count < self.num_lines:
			if line_count == 0:
				sequence += self.generate_line(self.start_letter)+"\n"
				line_count += 1
			else:
				if sequence[-2] in "qwertyuiopasdfghjklzcvbnm":
					sequence += self.generate_line(sequence[-2])+"\n"
					line_count += 1
		return sequence[:-1]

sequence = Sequence(15, 3, 'c')
print(sequence.generate_sequence())
