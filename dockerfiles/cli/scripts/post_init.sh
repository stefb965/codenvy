#!/bin/bash
# Copyright (c) 2016 Codenvy, S.A.
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Eclipse Public License v1.0
# which accompanies this distribution, and is available at
# http://www.eclipse.org/legal/epl-v10.html
#
# Contributors:
#   Tyler Jewell - Initial Implementation
#

post_init() {
  GLOBAL_HOST_IP=${GLOBAL_HOST_IP:=$(docker_run --net host ${BOOTSTRAP_IMAGE_CHEIP})}
  DEFAULT_CODENVY_HOST=$GLOBAL_HOST_IP

  if [ -z ${CODENVY_HOST+x} ]; then
    CHE_HOST_SET_ON_COMMAND_LINE=false
  else
    CHE_HOST_SET_ON_COMMAND_LINE=true
  fi

  CODENVY_HOST=${CODENVY_HOST:-${DEFAULT_CODENVY_HOST}}
}
