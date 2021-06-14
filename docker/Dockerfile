FROM alpine
COPY --from=nevinee/s6-overlay-stage:latest / /
COPY --from=nevinee/loop:latest / /
ARG JD_BASE_URL=https://github.com/Dellear/lost-god.git
ARG JD_BASE_BRANCH=v4
ARG JD_SCRIPTS_URL=https://github.com/JDHelloWorld/jd_scripts.git
ARG JD_SCRIPTS_BRANCH=main
ARG JD_SCRIPTS_KEY="-----BEGIN OPENSSH PRIVATE KEY-----@b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn@NhAAAAAwEAAQAAAYEA3ZgdSrFLCRpzqpHKkAZGm/pmuOIhuucde67jBqiB1k2jRz0Vlanf@JyO6nvc5awxj6V7tJ5/4rnx6PuoEnwlpUO0fnc8LQEkP9ARDcL1ppr+wSj50ec6CplbDmU@wn0qLdSeAfuKbijMrLYiCiRC2GOif+kbfsjDK6AQ3dRfh6JgTU5/SpmKsRZKSeklfDFihz@CZWzudhu/5dODCfRXH8ABvl0fOnJmU/2a7mv/zbbX65bjGvO7XwgWHj0uayS6K0rUmPSBd@Ye48eNNTqNIZNwvoRQjRT9WiM3bFVlGIBlEVBg+fm4w2sajrM2aAzG8jBQ2MfShumEwT06@f2hhYpLEuPhAQclC/4HEJLMmoY8vGIL887VPlUl3EHD9r+byDUpUuxV8v7e4Fn5XJPu4w4@01qk77woxFkJYWWM+QNztKvxC7zDBF6iC+eF0eUFF1/k55P8KKByRwVFPVQZqPqr1mFRaD@vUy8OS3ZwHi8ljAQUOQiASDufDhZHb+bsBU3Y4HPAAAFiGEWvxhhFr8YAAAAB3NzaC1yc2@EAAAGBAN2YHUqxSwkac6qRypAGRpv6ZrjiIbrnHXuu4waogdZNo0c9FZWp3ycjup73OWsM@Y+le7Sef+K58ej7qBJ8JaVDtH53PC0BJD/QEQ3C9aaa/sEo+dHnOgqZWw5lMJ9Ki3UngH7@im4ozKy2IgokQthjon/pG37IwyugEN3UX4eiYE1Of0qZirEWSknpJXwxYocwmVs7nYbv+X@Tgwn0Vx/AAb5dHzpyZlP9mu5r/8221+uW4xrzu18IFh49LmskuitK1Jj0gXWHuPHjTU6jS@GTcL6EUI0U/VojN2xVZRiAZRFQYPn5uMNrGo6zNmgMxvIwUNjH0obphME9On9oYWKSxLj4@QEHJQv+BxCSzJqGPLxiC/PO1T5VJdxBw/a/m8g1KVLsVfL+3uBZ+VyT7uMONNapO+8KMRZ@CWFljPkDc7Sr8Qu8wwReogvnhdHlBRdf5OeT/CigckcFRT1UGaj6q9ZhUWg71MvDkt2cB4@vJYwEFDkIgEg7nw4WR2/m7AVN2OBzwAAAAMBAAEAAAGAU/jn6L0kxS9b86BJ1ag7K7KJKL@iwtYYNWyhb6dMDWLWVEVLpkgyMfuWAO+tNu+43EmGhlyl88IpFPQArfiTv3vXszD2Acvz8@6aiP8fIlTkZHxOrD8sC6K9SnTLlaQezr1Kn0+2FqapYS2n2pYBKsUe+D/a5oGnzCldGuL2@zIxQ2BrOC/QBZbgfsMCELvr77mURSExgFplru8nMieAuIxnXL8nLVvawStSgdU1W7xVOHa@2WylPsOR8lTr0EzAYyHzmxnfHb8z+aixo9qY52OeSAEiLHRsh1StN4IZuJNgNbjreEAO7f@idO4A5toOg/OE3NR7bgi2mu6ul917A5+9j6pAvBySa1E3PVGj/+mTCoHKJ7bE8c7bEu+kM@zIl9vcaTv/YnjqDHIFWahzZSI2CB/3u8q5jT7qTAH2OTLsVvmX83Ck7uehN6q4LmMy2KGZ@26N855LVt/G6UON0rx8gzmW9x7I3VqnK+zG3esYRbSotPVBNV14IMUaU9IqDgB4J7JAAAA@wQCwU0gzKlFD/pWlIW8BZhrafcpwJpaw8MF7X8DYwEr2a28h4fByek7OIuvQdOIFa/oo5v@xnEF4Pz26ztbyifIdKP/tAxa15lq7PMoKY7JpQRCOMoOj5QLg4W664p2UJHa/pZ11+881Z@NwTIyORAIoqTRNDeqOKl6NZdDa/AGgG5qRvh9VjdURFeHwsFNPlrrgNOExdSMgZSMomIrU@1Hoe//nTTAaJhbHJyOxeiL2cPdiO5imPNEGmb9zK5TLpxTfzAAAADBAPham1YOs5MMb4KI@SmdyId67r4ROu6D8c4cLuCpCOVpNxDmkq29YufHPLBQwPYBMVSIPOvLg3LLV5H5Vb+doey@e8Mkv11TSW4ImhT6OiW022FEhT/ZMmTy0vJqqYs/pwyMKd6mADsFoxwLh3Rof6cNYkXVKB@q4ANeZbZ4E6mCrFxyg9BiTEoUoGlh8DfDjYS8luqMCXrQms57Mj2NPPiHzlznYHqrtknBQ@e/yhLfvgzk/Ds/MgJ6qqHeQhrtFGj6ewAAAMEA5GqaB3INCh0u/UB7qzWBQ4J4geCaryFB@TSCtl/v25+O6OwNT//5t428qaKt8cPNPdormganK5OOnkkvkbzHLDAh81ySFv9xZJV6ByB@loyuwjaZz7VCAJxV255PypbdXkbbYta1EjMeqnAuxmLOicPF+EpL3CodQhoxccNiJfqIgr@FiYdOeyhyDY0ZWnWKLJmnxC+clqAGvhDnH3fPAHLL0RdR7IFb9YDpFslUt0pr73g8Hrdc4@PtLGCnjCQF0i+9AAAAD2hrMS1ib3hAb3BlbndydAECAw==@-----END OPENSSH PRIVATE KEY-----"
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    LANG=zh_CN.UTF-8 \
    SHELL=/bin/bash \
    PS1="\u@\h:\w \$ " \
    JD_DIR=/jd \
    ENABLE_HANGUP=true \
    ENABLE_WEB_PANEL=true \
    ENABLE_TTYD=true
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && echo "========= 安装软件 =========" \
    && apk update -f \
    && apk upgrade \
    && apk --no-cache add -f bash \
                             coreutils \
                             diffutils \
                             git \
                             wget \
                             curl \
                             nano \
                             tzdata \
                             perl \
                             openssh-client \
                             ttyd \
                             nodejs-lts \
                             npm \
    && rm -rf /var/cache/apk/* \
    && echo "========= 部署SSH KEY  =========" \
    && mkdir -p /root/.ssh \
    && echo $JD_SCRIPTS_KEY | perl -pe "{s|_| |g; s|@|\n|g}" > /root/.ssh/id_rsa \
    && chmod 600 /root/.ssh/id_rsa \
    && ssh-keyscan gitee.com > /root/.ssh/known_hosts \
    && echo "========= 修改时区 =========" \
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && git config --global pull.ff only \
    && git clone -b ${JD_BASE_BRANCH} ${JD_BASE_URL} $JD_DIR \
    && cd $JD_DIR/panel \
    && npm config set registry https://registry.npm.taobao.org \
    && npm install \
    && git clone -b $JD_SCRIPTS_BRANCH $JD_SCRIPTS_URL $JD_DIR/scripts \
    && cd $JD_DIR/scripts \
    && npm install \
    && echo "========= 安装PM2 =========" \
    && npm install -g pm2 \
    && echo "========= 创建软链接 =========" \
    && ln -sf $JD_DIR/jtask.sh /usr/local/bin/jtask \
    && ln -sf $JD_DIR/jtask.sh /usr/local/bin/otask \
    && ln -sf $JD_DIR/jtask.sh /usr/local/bin/mtask \
    && ln -sf $JD_DIR/jup.sh /usr/local/bin/jup \
    && ln -sf $JD_DIR/jlog.sh /usr/local/bin/jlog \
    && ln -sf $JD_DIR/jcode.sh /usr/local/bin/jcode \
    && ln -sf $JD_DIR/jcsv.sh /usr/local/bin/jcsv \
    && if [ -d /etc/cont-init.d ]; then rm -rf /etc/cont-init.d; fi \
    && if [ -d /etc/services.d ]; then rm -rf /etc/services.d; fi \
    && ln -sf $JD_DIR/s6-overlay/etc/cont-init.d /etc/cont-init.d \
    && ln -sf $JD_DIR/s6-overlay/etc/services.d /etc/services.d \
    && chmod -R +x $JD_DIR/s6-overlay/etc/* \
    && echo "========= 清理 =========" \
    && rm -rf /root/.npm /var/cache/apk/*
WORKDIR $JD_DIR
ENTRYPOINT /init
