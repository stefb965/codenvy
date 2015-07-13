/*
 * CODENVY CONFIDENTIAL
 * __________________
 *
 *  [2012] - [2015] Codenvy, S.A.
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Codenvy S.A. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Codenvy S.A.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Codenvy S.A..
 */
package com.codenvy.docker;

import com.sun.jna.Library;
import com.sun.jna.Native;
import com.sun.jna.Structure;
import com.sun.jna.ptr.LongByReference;

import org.eclipse.che.api.core.util.SystemInfo;

import java.util.Arrays;
import java.util.List;

/**
 * @author andrew00x
 */
// C language functions
public interface CLibrary extends Library {
    int AF_UNIX     = 1; // Defined in 'sys/socket.h'
    int SOCK_STREAM = 1; // Defined in 'sys/socket.h'

    // Defined in 'unix.h', see http://man7.org/linux/man-pages/man7/unix.7.html
    public static class SockAddrUn extends Structure {
        public static final int UNIX_PATH_MAX = 108;

        public short  sun_family;
        public byte[] sun_path;

        public SockAddrUn(String path) {
            byte[] pathBytes = path.getBytes();
            if (pathBytes.length > UNIX_PATH_MAX) {
                throw new IllegalArgumentException(String.format("Path '%s' is too long. ", path));
            }
            sun_family = AF_UNIX;
            sun_path = new byte[pathBytes.length + 1];
            System.arraycopy(pathBytes, 0, sun_path, 0, Math.min(sun_path.length - 1, pathBytes.length));
            allocateMemory();
        }

        @Override
        protected List getFieldOrder() {
            return Arrays.asList("sun_family", "sun_path");
        }
    }

    int socket(int domain, int type, int protocol);

    int connect(int fd, SockAddrUn sock_addr, int addr_len);

    int send(int fd, byte[] buffer, int count, int flags);

    int recv(int fd, byte[] buffer, int count, int flags);

    int close(int fd);

    String strerror(int errno);

    int write(int fd, byte[] buff, int count);

    int read(int fd, byte[] buf, int count);

    int eventfd(int initval, int flag);

    int eventfd_read(int fd, LongByReference val);

    int open(String path, int mode);

    int O_RDONLY = 0x00;
    int O_WRONLY = 0x01;
}
