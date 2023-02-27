NAME	= inception

.PHONY	: all
all	: $(NAME)

$(NAME)	:
	@printf "Launching configuration ${NAME}...\n"
	sudo mkdir -p ${HOME}/data/wordpress ${HOME}/data/mariadb ${HOME}/data/site ${HOME}/data/monitor
	@docker-compose -f ./srcs/docker-compose.yml --env-file srcs/.env up -d

.PHOMY : down
down   :
	@printf "Stopping configuration ${NAME}...\n"
	@docker-compose -f ./srcs/docker-compose.yml --env-file srcs/.env down

.PHONY	: clean
clean	:
	@printf "Cleaning configuration ${NAME}...\n"
	sudo docker-compose -f srcs/docker-compose.yml down -v --rmi all --remove-orphans

.PHONY	: fclean
fclean	: clean
	@printf "Total clean of all configurations docker\n"
	sudo rm -rf ${HOME}/data
	sudo docker system prune --volumes --all --force
	sudo docker network prune --force
	sudo docker volume prune --force

.PHONY	: re
re	: fclean all

.PHONY	: ps
ps	:
	sudo docker-compose -f srcs/docker-compose.yml ps
