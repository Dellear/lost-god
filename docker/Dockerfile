FROM node:lts-alpine
ARG JD_BASE_URL=https://github.com/Dellear/lost-god.git
ARG JD_BASE_BRANCH=v4
ARG JD_SCRIPTS_URL=git@gitee.com:dellear/jd_scripts.git
ARG JD_SCRIPTS_BRANCH=master
ARG KEY="-----BEGIN OPENSSH PRIVATE KEY-----\n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\n-----END OPENSSH PRIVATE KEY-----"
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    LANG=zh_CN.UTF-8 \
    SHELL=/bin/bash \
    PS1="\u@\h:\w \$ " \
    JD_DIR=/jd \
    ENABLE_HANGUP=true \
    ENABLE_WEB_PANEL=true
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && apk update -f \
    && apk upgrade \
    && apk --no-cache add -f bash \
                             coreutils \
                             moreutils \
                             git \
                             wget \
                             curl \
                             nano \
                             tzdata \
                             perl \
                             openssh-client \
    && mkdir -p /root/.ssh \
    && echo -e $KEY > /root/.ssh/id_rsa \
    && chmod 600 /root/.ssh/id_rsa \
    && ssh-keyscan gitee.com > /root/.ssh/known_hosts \
    && rm -rf /var/cache/apk/* \
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && git clone -b ${JD_BASE_BRANCH} ${JD_BASE_URL} ${JD_DIR} \
    && cd ${JD_DIR}/panel \
    && npm config set registry https://registry.npm.taobao.org \
    && yarn \
    && git clone -b ${JD_SCRIPTS_BRANCH} ${JD_SCRIPTS_URL} ${JD_DIR}/scripts \
    && cd ${JD_DIR}/scripts \
    && yarn \
    && npm install -g pm2 \
    && ln -sf ${JD_DIR}/jd.sh /usr/local/bin/jd \
    && ln -sf ${JD_DIR}/git_pull.sh /usr/local/bin/git_pull \
    && ln -sf ${JD_DIR}/rm_log.sh /usr/local/bin/rm_log \
    && ln -sf ${JD_DIR}/export_sharecodes.sh /usr/local/bin/export_sharecodes \
    && cp -f ${JD_DIR}/docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh \
    && chmod 777 /usr/local/bin/docker-entrypoint.sh \
    && rm -rf /root/.npm /usr/local/share/.cache
WORKDIR ${JD_DIR}
ENTRYPOINT docker-entrypoint.sh
