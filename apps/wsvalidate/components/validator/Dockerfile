FROM bitnami/git:latest as git

RUN git clone https://github.com/cetra3/lorikeet

FROM clux/muslrust as build

# this actually copies the contents into the local dir
# so cp -r dir/*  instead of cp-r dir
COPY --from=git lorikeet .

RUN cargo build --release

FROM alpine:latest

COPY --from=build /volume/target/x86_64-unknown-linux-musl/release/lorikeet .

CMD ["/lorikeet", "/test.yml"]
